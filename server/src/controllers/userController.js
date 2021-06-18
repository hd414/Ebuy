const User = require('../models/user');
const jwt = require('jsonwebtoken');
const payment = require('../models/payment');


exports.signUp = async (req, res) => {
    try {
        const { name, email, password, contactNumber, address } = req.body;
        const user = new User({ name, email, password, contactNumber, address });
        const userPresent = await User.findOne({ email });
        if (userPresent) {
            return res.status(400).json({ error: "email is already exists" });
        }

        // const token = await user.generateAuthToken();
        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/api/refresh_token',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
        })

        await user.save();
        return res.status(200).send({ user, accessToken });

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
        jwt.verify(rt, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err)
                return res.status(400).send("please signin or signup");
            const accessToken = createAccessToken(user)
            res.json({ accessToken, user });
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
        const user = await User.findByCredentials(email, password);
        // console.log(user)

        if (!user)
            return res.status(400).json({ error: "user does not exists" });

        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        // console.log(refreshToken);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/api/refresh_token',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
        })

        res.status(200).json({ user, accessToken });
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

exports.getUser = async (req, res) => {
    try {
        // console.log(req.user);
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(400).json({ error: "user does not exists" });
        }

        res.json(user);
    }
    catch (e) {
        res.status(500).send({ error: e.message });
    }
}

const createAccessToken = (user) => {
    return jwt.sign({ _id: user._id.toString() }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
}

const createRefreshToken = (user) => {
    return jwt.sign({ _id: user._id.toString() }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '6d' });
}

exports.addCart = async (req, res) => {
    try {
        const user = User.findById(req.user._id);
        // console.log(req)
        if (!user)
            res.status(400).json({ error: "user does not exists" });

        await User.findByIdAndUpdate({ _id: req.user._id }, {
            cart: req.body.cart
        })
        res.status(200).json({ msg: "item added to cart" })
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
}

exports.getHistory = async (req, res) => {
    try {
        const history = await payment.find({ user_id: req.user._id });
        res.status(200).json(history);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.getUserData = async (req, res) => {
    try {
        const id = req.params.id;
        const res = await User.findById(id).select({ "_id": 0, "name": 1, "address": 1 });
        res.status(200).json({ res });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}