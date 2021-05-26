const Category = require('../models/category');


exports.getCategory = async (req, res) => {
    try {
        // res.send("all categories are here");
        const categories = await Category.find({});
        return res.status(200).json(categories);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }

}


exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const cate = await Category.findOne({ name });
        if (cate)
            return res.status(400).json({ error: "category already exists" });

        const category = new Category({ name });
        await category.save();
        return res.status(200).send({ category });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        // res.send('category deleted')
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json("categroy deleted");
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}



exports.editCategory = async (req, res) => {
    try {
        // res.send('category deleted')
        const { name } = req.body;
        await Category.findByIdAndUpdate({ _id: req.params.id }, { name });
        res.status(200).json("categroy updated");
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}
