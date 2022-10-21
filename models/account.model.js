const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        contact: String,
        identifyNumber: String,
        address: String,
        birthday: String,
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        rank: {
            type: String,
            required: true,
            default: 'Customer',
        },
        score: {
            type: Number,
            required: true,
            default: 0,
        },
        gender: {
            type: String,
            required: true,
            default: 'male',
        },
        avatar: {
            type: String,
            require: true,
            default: '',
        },

        int_id: String,

        listTicketId: Array,
        listReview: Array,
    },
    { timestamps: true },
    {
        collection: 'account',
    },
);

const AccountModel = mongoose.model('account', AccountSchema);

module.exports = AccountModel;
