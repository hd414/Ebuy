const Product = require("../models/product");

exports.getProducts = async (req, res) => {
    try {
        // res.send("get products");
        const products = await Product.find({});
        res.status(200).json({ products });

    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.createProduct = async (req, res) => {
    try {
        // res.send("create  products");
        const { product_id, title, price, description, content, images, category } = req.body;

        if (!images) {
            return res.status(400).json({ error: "images should be uploaded" });
        }

        const product = await Product.findOne({ product_id });

        if (product)
            return res.status(400).json({ error: "this product already exists" });

        const prod = new Product({ product_id, title: title.toLowerCase(), price, description, content, images, category });
        const result = await prod.save();
        res.status(200).json({ prod });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.editProducts = async (req, res) => {
    try {
        // res.send("edit product");
        const id = req.params.id;
        const { title, price, description, content, images, category } = req.body;

        const product = await Product.findByIdAndUpdate({ _id: id },
            { title: title.toLowerCase(), price, description, content, images, category });

        res.status(200).json({ msg: "updated the product" });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.deleteProducts = async (req, res) => {
    try {
        // res.send("delete prodcut");
        const id = req.params.id;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ msg: "product deleted" });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}

