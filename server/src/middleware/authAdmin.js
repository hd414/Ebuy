const jwt = require('jsonwebtoken');
const Shop = require('../models/shop');


exports.authAdmin = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(400).json({ msg: "authentication required" });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, shop) => {
            if (err)
                return res.status(400).json({ msg: "Invalid Authentication" })
            req.shop = shop
        })

        next();

    }
    catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

exports.isAdmin = async (req, res, next) => {
    try {

        const shop = await Shop.findById(req.shop._id).select('-password');
        if (!shop) {
            return res.status(400).json({ error: "shop does not exists" });
        }

        if (shop.role !== 'admin') {
            return res.status(200).send({ error: 'admin access denied...' });
        }
        next();
    }
    catch (e) {
        return res.status(500).json({ error: e.message });
    }

}

// exports.isshop = (req, res, next) => {
//     if (req.shop.role !== 'shop') {
//         return res.status(200).send({ error: 'shop access denied...' });
//     }
//     next();
// }