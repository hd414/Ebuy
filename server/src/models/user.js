const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    contactNumber: {
        type: String
    },
    // tokens: [{
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }],
    profilePicture: {
        type: String
    },
    cart: {
        type: Array,
        default: []
    }
}, { timestamps: true })


// userSchema.methods.generateAuthToken = async function () {
//     const user = this;
//     const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     user.tokens = user.tokens.concat({ token });
//     await user.save();
//     return token
// }


userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('unable to login');
    }

    return user;

}


const User = mongoose.model("User", userSchema);


module.exports = User;