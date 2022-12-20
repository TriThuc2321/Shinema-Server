const mongoose = require('mongoose');

const reportAnalysisSchema = new mongoose.Schema(
    {
        _filmId: {
            type: String,
        },
        title: {
            type: String,
        },
        count: {
            type: Number,
        },
        name: {
            type: String,
        },
    },
    { timestamps: true },
    {
        collection: 'reportAnalysis',
    },
);

const reportAnalysisModel = mongoose.model('reportAnalysis', reportAnalysisSchema);

module.exports = reportAnalysisModel;
