const { cloudinary } = require('../config/cloundinary.config');

const cloudinaryController = {
    uploadImages: async (req, res, next) => {
        try {
            const listImages = req.body;
            const result = [];
            listImages.map(async (item) => {
                const uploadedResponse = await cloudinary.uploader
                    .upload_large(item, {
                        upload_preset: 'shinema_preset',
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).send('Load images failed!');
                    });
                if (uploadedResponse) result.push(uploadedResponse.url);
                else {
                    console.log(err);
                    res.status(400).send('Load images failed!');
                }
                if (result.length == listImages.length) res.status(200).send(result);
            });
        } catch (error) {
            res.status(500).send('Failed!');
        }
    },
};

module.exports = cloudinaryController;
