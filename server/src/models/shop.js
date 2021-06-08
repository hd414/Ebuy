const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const shopSchema = mongoose.Schema({
    shopName: {
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
        default: "admin",
    },
    contactNumber: {
        type: String,
        required: true
    },
    shopPic: {
        type: Object,
        required: true
    },
    homeDelivery: {
        type: Boolean,
        required: true
    },
    address: {
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        }
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
}, { timestamps: true })


// userSchema.methods.generateAuthToken = async function () {
//     const user = this;
//     const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     user.tokens = user.tokens.concat({ token });
//     await user.save();
//     return token
// }


shopSchema.pre('save', async function (next) {
    const shop = this

    if (shop.isModified('password')) {
        shop.password = await bcrypt.hash(shop.password, 8)
    }

    next()
})

shopSchema.statics.findByCredentials = async (email, password) => {

    const shop = await Shop.findOne({ email });

    if (!shop) {
        throw new Error('unable to login');
    }

    const isMatch = await bcrypt.compare(password, shop.password);

    if (!isMatch) {
        throw new Error('unable to login');
    }

    return shop;

}



const Shop = mongoose.model("Shop", shopSchema);


module.exports = Shop;