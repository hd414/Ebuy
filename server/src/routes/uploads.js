const cloudinary = require('cloudinary');
const router = require('express').Router();
const fs = require('fs');
const { authAdmin, isAdmin } = require('../middleware/authAdmin');



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


router.post('/uploads',
    //  authAdmin, isAdmin,
    async (req, res) => {
        try {
            // console.log(req.files);


            const file = req.files.file;
            // console.log(file);

            if (!req.files || Object.keys(req.files).length === 0) {
                removeTempFiles(file.tempFilePath);
                return res.status(400).json({ error: "No files were uploaded" });
            }


            if (file.size > 1024 * 1024 * 3) {
                removeTempFiles(file.tempFilePath);
                return res.status(400).json({ error: "image size too large" });
            }


            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                removeTempFiles(file.tempFilePath);
                return res.status(400).json({ error: "file format is not correct" });
            }


            cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "test" }, async (err, result) => {
                removeTempFiles(file.tempFilePath);
                if (err)
                    throw err;
                res.json({ public_id: result.public_id, url: result.url })
            })

            // res.json('files upload testing');
        }
        catch (e) {
            return res.status(500).json({ error: e.message });
        }
    })


router.post('/uploads/delete', authAdmin, isAdmin, async (req, res) => {
    try {
        const { public_id } = req.body;
        if (!public_id)
            return res.status(400).json({ error: "No images to delete" })

        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json({ msg: "image deleted" });
        })
    }
    catch (e) {
        return res.status(500).json({ error: e.message })
    }

})

const removeTempFiles = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err)
            throw err;
    })
}

module.exports = router