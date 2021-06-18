const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        default: []
    },
    status: {
        type: Boolean,
        default: false
    },
    shop_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Orders", orderSchema);