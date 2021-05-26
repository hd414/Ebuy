const cloudinary = require('cloudinary');
const router = require('express').Router();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


router.post('/uploads', async (req, res) => {
    try {
        console.log(req.files);
        res.json('files upload testing');
    }
    catch (e) {
        return res.status(500).json({ error: e.message });
    }
})

module.exports = router