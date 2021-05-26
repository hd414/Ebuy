const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    categoryImg: {
        type: String
    }
}, { timestamps: true });




const Category = mongoose.model('Category', categorySchema);

module.exports = Category;