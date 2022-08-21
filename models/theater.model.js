const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        address: {
            type: String,
        },
        contact: {
            type: String,
        },
        managerId: {
            type: String,
        },
        price: {
            type: String,
        },
        listRoom: Array,
    },
    { timestamps: true },
    {
        collection: 'theater',
    },
);

const TheaterModel = mongoose.model('theater', theaterSchema);

module.exports = TheaterModel;
