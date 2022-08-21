const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema(
    {
        _filmId: {
            type: String,
            required: true,
        },

        _theaterId: {
            type: String,
            required: true,
        },

        _roomId: {
            type: String,
            required: true,
        },

        seatIdArray: {
            type: Array,
            required: true,
        },

        dateOccur: {
            type: String,
            required: true,
        },

        timeOccur: {
            type: String,
            required: true,
        },

        _userEmail: {
            type: String,
            required: true,
        },

        bookedTime: {
            type: String,
            required: true,
        },

        isCancelled: {
            type: Boolean,
            required: true,
            default: false,
        },

        address: {
            type: String,
            required: true,
            default: '',
        },

        contact: {
            type: String,
            required: true,
            default: '',
        },

        name: {
            type: String,
            required: true,
            default: '',
        },

        invoice: {
            quantity: {
                type: Number,
                required: true,
            },

            price: {
                type: Number,
                required: true,
            },

            total: {
                type: Number,
                required: true,
            },

            // _discountId: {
            //     type: String,
            //     default: ''
            // },

            // discountMoney: {
            //     type: Number,
            //     default: 0
            // },

            method: {
                type: String,
                required: true,
                default: 'Cash',
            },
        },
    },
    { timestamps: true },
    {
        collection: 'ticket',
    },
);

const TicketModel = mongoose.model('ticket', TicketSchema);

module.exports = TicketModel;
