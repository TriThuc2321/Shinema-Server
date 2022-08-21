const mongoose = require('mongoose');

const JWTRefTokensSchema = new mongoose.Schema(
    {
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true },
    {
        collection: 'refreshToken',
    },
);

const JWTtModel = mongoose.model('refreshToken', JWTRefTokensSchema);

module.exports = JWTtModel;
