const TicketModel = require('../models/ticket.model');

const ticketController = {
    getAll: (req, res) => {
        TicketModel.find({})
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500).json({ Err: err });
            });
    },

    getById: (req, res) => {
        TicketModel.findOne({
            _id: req.params.id,
        })
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500).json({ Err: err });
            });
    },

    getByUser: (req, res) => {
        TicketModel.find({
            _userEmail: req.params.email,
        })
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500).json({ Err: err });
            });
    },

    getBookedSeats: (req, res) => {
        TicketModel.find({
            dateOccur: req.body.date,
            timeOccur: req.body.time,
            _theaterId: req.body.theaterId,
            _roomId: req.body.room,
        })
            .then((data) => {
                if (data === null || data === undefined) res.send('getBookedSeats returns null/ undefined');
                else {
                    const tmp = data.map((item) => item.seatIdArray);
                    const result = [];

                    tmp.forEach((array) => {
                        array.forEach((seatId) => {
                            result.push(seatId);
                        });
                    });
                    res.json(result);
                }
            })
            .catch((err) => {
                res.status(500).json({ Err: err });
            });
    },

    create: (req, res) => {
        TicketModel.findOne({
            _id: req.body.id,
        })
            .then((data) => {
                if (data) {
                    res.send('Id already exists');
                    return;
                } else {
                    const newTicket = {
                        _filmId: req.body._filmId,
                        _theaterId: req.body._theaterId,
                        _roomId: req.body._roomId,
                        seatIdArray: req.body.seatIdArray,
                        dateOccur: req.body.dateOccur,
                        timeOccur: req.body.timeOccur,
                        _userEmail: req.body._userEmail,
                        bookedTime: req.body.bookedTime,
                        isCancelled: req.body.isCancelled,
                        invoice: {
                            quantity: req.body.invoice.quantity,
                            price: req.body.invoice.price,
                            total: req.body.invoice.total,
                            method: req.body.invoice.method,
                        },
                        address: req.body.address,
                        name: req.body.name,
                        contact: req.body.contact,
                    };

                    if (newTicket.id === null || newTicket.id == '') return res.send('Ticket ID null');
                    if (newTicket._filmId === null || newTicket._filmId == '') return res.send('Ticket filmId null');
                    if (newTicket._theaterId === null || newTicket._theaterId == '') {
                        return res.send('Ticket theaterId null');
                    }
                    if (newTicket._roomId === null || newTicket._roomId == '') return res.send('Ticket RoomId null');
                    if (newTicket._seatIdArray === null || newTicket._seatIdArray == '') {
                        return res.send('Ticket seatIdArray null');
                    }
                    if (newTicket.dateOccur === null || newTicket.dateOccur == '') {
                        return res.send('Ticket DateOccur null');
                    }
                    if (newTicket.timeOccur === null || newTicket.timeOccur == '') {
                        return res.send('Ticket TimeOccur null');
                    }
                    if (newTicket._userEmail === null || newTicket._userEmail == '') {
                        return res.send('Ticket User email null');
                    }
                    if (newTicket.bookedTime === null || newTicket.bookedTime == '') {
                        return res.send('Booked Time null');
                    }
                    // if (newTicket.isCancelled === null || newTicket.isCancelled == '')
                    //     return res.send('Is Cancel null')

                    if (newTicket.invoice.id === null || newTicket.invoice.id == '') return res.send('Invoice Id null');
                    if (newTicket.invoice.quantity === null || newTicket.invoice.quantity == '') {
                        return res.send('Invoice Quantity null');
                    }
                    if (newTicket.invoice.price === null || newTicket.invoice.price == '') {
                        return res.send('Invoice Price null');
                    }
                    if (newTicket.invoice.total === null || newTicket.invoice.total == '') {
                        return res.send('Invoice Total null');
                    }
                    if (newTicket.invoice.method === null || newTicket.invoice.method == '') {
                        return res.send('Invoice Method null');
                    }

                    if (newTicket.address === null || newTicket.address === undefined) return res.send('Address null');
                    if (newTicket.contact === null || newTicket.contact === undefined) return res.send('Contact null');
                    if (newTicket.name === null || newTicket.name === undefined) return res.send('Name null');
                    return TicketModel.create(newTicket);
                }
            })
            .then((data) => {
                res.send('Successful');
            })
            .catch((err) => {
                res.status(500).json({ Err: err });
            });
    },

    update: (req, res) => {
        TicketModel.updateOne(
            { _id: req.body._id },
            {
                _filmId: req.body._filmId,
                _theaterId: req.body._theaterId,
                _roomId: req.body._roomId,
                seatIdArray: req.body.seatIdArray,
                dateOccur: req.body.dateOccur,
                timeOccur: req.body.timeOccur,
                _userEmail: req.body._userEmail,
                bookedTime: req.body.bookedTime,
                isCancelled: req.body.isCancelled,
                invoice: req.body.invoice,
                name: req.body.name,
                contact: req.body.contact,
                address: req.body.address,
            },
            { new: 'true' },
        )
            .then((data) => {
                res.json('Update successful');
            })
            .catch((err) => {
                res.status(500).json({ Err: err });
            });
    },

    deleteById: (req, res) => {
        TicketModel.deleteOne({
            id: req.params.id,
        })
            .then((data) => {
                res.json('Delete successful');
            })
            .catch((err) => {
                res.status(500).json({ Err: err });
            });
    },
};

module.exports = ticketController;
