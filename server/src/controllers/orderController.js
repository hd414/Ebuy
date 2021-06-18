const Orders = require("../models/orders");

exports.getUserOrders = async (req, res) => {

    try {
        const id = req.user._id;
        const orders = await Orders.find({ user_id: id }).sort({ createdAt: -1 })
        res.status(200).json({ orders });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }

}

exports.getAdminOrders = async (req, res) => {

    try {
        const id = req.shop._id;
        const orders = await Orders.find({ shop_id: id })
        res.status(200).json({ orders });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }

}

exports.orderFromShop = async (req, res) => {
    try {
        const user = req.user._id;
        console.log(user);
        console.log(req.body);
        const { cartItems, shop } = req.body;

        const order = new Orders({ user_id: user, shop_id: shop, cart: cartItems });
        await order.save();
        res.status(200).json({ order });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const res = await Orders.findByIdAndUpdate({ _id: id }, { status: !status });
        res.status(200).json({ msg: "status updated" });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}

