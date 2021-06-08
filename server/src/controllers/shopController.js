
const jwt = require('jsonwebtoken');
const payment = require('../models/payment');
const Shop = require('../models/shop');


exports.signUp = async (req, res) => {
    try {

        const { shopName, email, password, contactNumber, homeDelivery, address, shopPic } = req.body;

        if (!shopPic) {
            return res.status(400).json({ error: "image should be uploaded" });
        }

        const shop = new Shop({ shopName, email, password, contactNumber, homeDelivery, address, shopPic });
        const shopPresent = await Shop.findOne({ email });
        if (shopPresent) {
            return res.status(400).json({ error: "email is already exists" });
        }

        // const token = await shop.generateAuthToken();
        const accessToken = createAccessToken(shop);
        const refreshToken = createRefreshToken(shop);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/api/refresh_token',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
        })

        await shop.save();
        return res.status(200).send({ shop, accessToken });

    }
    catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

exports.refreshToken = (req, res) => {

    try {
        const rt = req.cookies.refreshToken;
        if (!rt) {
            return res.status(400).send("please signin or signup no refresh token");
        }
        jwt.verify(rt, process.env.REFRESH_TOKEN_SECRET, (err, shop) => {
            if (err)
                return res.status(400).send("please signin or signup");
            const accessToken = createAccessToken(shop)
            res.json({ accessToken, shop });
        })
    }
    catch (e) {
        res.status(400).send({ error: e.message });
    }

}


exports.signIn = async (req, res) => {
    try {

        const { email, password } = req.body;
        // console.log(req.body)
        const shop = await Shop.findByCredentials(email, password);
        // console.log(shop)

        if (!shop)
            return res.status(400).json({ error: "shop does not exists" });

        const accessToken = createAccessToken(shop);
        const refreshToken = createRefreshToken(shop);

        // console.log(refreshToken);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/api/refresh_token',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
        })

        res.status(200).json({ shop, accessToken });
    }
    catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

exports.signOut = async (req, res) => {
    try {
        res.clearCookie('refreshToken', { path: '/api/refresh_token' })
        res.status(200).json({ error: "logged Out" });
    }
    catch (e) {
        res.status(500).send({ error: e.message });
    }
}

exports.getshop = async (req, res) => {
    try {
        // console.log(req.shop);
        const shop = await Shop.findById(req.shop._id).select('-password');
        if (!shop) {
            return res.status(400).json({ error: "shop does not exists" });
        }

        res.json(shop);
    }
    catch (e) {
        res.status(500).send({ error: e.message });
    }
}

exports.getshops = async (req, res) => {
    try {
        // console.log(req.shop);
        const shops = await Shop.find({}).select("-password");
        // if (!shops) {
        //     return res.status(400).json({ error: "shop does not exists" });
        // }

        return res.status(200).json({
            status: "success",
            results: shops.length,
            shops,

        });

        // res.json(shops);
    }
    catch (e) {
        res.status(500).send({ error: e.message });
    }
}

const createAccessToken = (shop) => {
    return jwt.sign({ _id: shop._id.toString() }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
}

const createRefreshToken = (shop) => {
    return jwt.sign({ _id: shop._id.toString() }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '6d' });
}

// exports.addCart = async (req, res) => {
//     try {
//         const shop = shop.findById(req.shop._id);
//         // console.log(req)
//         if (!shop)
//             res.status(400).json({ error: "shop does not exists" });

//         await shop.findByIdAndUpdate({ _id: req.shop._id }, {
//             cart: req.body.cart
//         })
//         res.status(200).json({ msg: "item added to cart" })
//     }
//     catch (e) {
//         res.status(500).json({ error: e.message })
//     }
// }

exports.getHistory = async (req, res) => {
    try {
        const history = await payment.find({ shop_id: req.shop._id });
        res.status(200).json(history);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}




exports.getShopProducts = async (req, res) => {
    try {
        const shop_id = req.params.id;
        const shop = await Shop.findById(shop_id).select("-password");

        await shop.populate("products").execPopulate();


        res.status(200).json({ shop });

    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}
