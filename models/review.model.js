const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        plot: {
            type: String,
        },
        advantage: {
            type: String,
        },
        defect: {
            type: String,
        },
        overview: {
            type: String,
        },
        time: {
            type: String,
        },
        star: {
            type: String,
        },
        voteNum: {
            type: Number,
        },
        status: {
            type: String,
        },
        listComments: {
            type: Array,
        },
        _userId: {
            type: String,
        },
        _filmId: {
            type: String,
        },
        _censorId: {
            type: String,
        },
    },
    { timestamps: true },
    {
        collection: 'reviews',
    },
);

const ReviewModel = mongoose.model('reviews', reviewSchema);

module.exports = ReviewModel;
