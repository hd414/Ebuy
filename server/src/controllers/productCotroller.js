const Product = require("../models/product");



class Operations {
    constructor(query, query_values) {
        this.query = query;
        this.query_values = query_values;
    }

    filtering() {
        const queryObj = { ...this.query_values } //queryString = req.query\
        // console.log('queryObj', queryObj);

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete (queryObj[el]))
        // console.log('queryObj', queryObj);
        let queryStr = JSON.stringify(queryObj)

        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        console.log('querystr', queryStr);

        //    gte = greater than or equal
        //    lte = lesser than or equal
        //    lt = lesser than
        //    gt = greater than
        //    regex = filter by other string fields
        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting() {

        if (this.query_values.sort) {
            const sortBy = this.query_values.sort.split(',').join(' ');
            console.log(sortBy);
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort('-createdAt');
        }

        return this
    }

    pagination() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}


exports.getProducts = async (req, res) => {
    try {
        // res.send("get products");
        const operations = new Operations(Product.find({}), req.query)
            .filtering().sorting().pagination();
        const products = await operations.query;
        res.status(200).json({
            status: "success",
            results: products.length,
            products,

        });

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
