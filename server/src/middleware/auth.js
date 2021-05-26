const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(400).json({ msg: "authentication required" });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err)
                return res.status(400).json({ msg: "Invalid Authentication" })
            req.user = user
        })

        next();

    }
    catch (e) {
        return res.status(500).json({ error: e.message });
    }
}

exports.isAdmin = async (req, res, next) => {
    try {

        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(400).json({ error: "user does not exists" });
        }

        if (user.role !== 'admin') {
            return res.status(200).send({ error: 'admin access denied...' });
        }
        next();
    }
    catch (e) {
        return res.status(500).json({ error: e.message });
    }

}

// exports.isUser = (req, res, next) => {
//     if (req.user.role !== 'user') {
//         return res.status(200).send({ error: 'user access denied...' });
//     }
//     next();
// }