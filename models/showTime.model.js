const mongoose = require('mongoose');

const showTimeSchema = new mongoose.Schema(
    {
        filmId: {
            type: String,
            required: true,
        },
        theaterId: {
            type: String,
            required: true,
        },
        roomId: {
            type: String,
            required: true,
        },
        listDateTime: Array,
    },
    { timestamps: true },
    {
        collection: 'showTime',
    },
);

const ShowTimeModel = mongoose.model('showTime', showTimeSchema);

module.exports = ShowTimeModel;
