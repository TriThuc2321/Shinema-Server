const AccountModel = require('../models/account.model');
const { validatePassword } = require('../utils');
const { encode } = require('base-64');

const accountController = {
    getAll: (req, res) => {
        AccountModel.find({})
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500).json({ Err: err });
            });
    },

    getByEmail: (req, res) => {
        AccountModel.findOne({
            email: req.params.email,
        })
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500).json({ Err: err });
            });
    },

    getById: (req, res) => {
        AccountModel.findOne({
            _id: req.params.id,
        })
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500).json({ Err: err });
            });
    },

    create: (req, res) => {
        AccountModel.findOne({
            email: req.body.email,
        })
            .then((data) => {
                if (data) {
                    res.send('Email already exists');
                    return;
                } else if (validatePassword(req.body.password)) {
                    res.send('Password has more than 6 charactor');
                    return;
                } else {
                    const newAccount = {
                        name: req.body.name,
                        contact: req.body.contact,
                        identifyNumber: req.body.identifyNumber,
                        address: req.body.address,
                        birthday: req.body.birthday,
                        email: req.body.email,
                        password: encode(req.body.password),
                        rank: req.body.rank,
                        score: req.body.score,
                        listTicketId: req.body.listTicketId,
                        listReview: req.body.listReview,
                        gender: req.body.gender,
                        avatar: req.body.avatar,
                    };

                    return AccountModel.create(newAccount);
                }
            })
            .then((data) => {
                res.send('Successful');
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ Err: err });
            });
    },

    update: (req, res) => {
        AccountModel.updateOne(
            { _id: req.body._id },
            {
                birthday: req.body.birthday,
                contact: req.body.contact,
                email: req.body.email,
                identifyNumber: req.body.identifyNumber,
                name: req.body.name,
                password: req.body.password,
                rank: req.body.rank,
                score: req.body.score,
                listTicketId: req.body.listTicketId,
                listReview: req.body.listReview,
                gender: req.body.gender,
                avatar: req.body.avatar,
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

    deleteByEmail: (req, res) => {
        AccountModel.deleteOne({
            email: req.params.email,
        })
            .then((data) => {
                res.json('Delete successful');
            })
            .catch((err) => {
                res.status(500).json('Delete error');
            });
    },

    checkEmail: (req, res) => {
        AccountModel.findOne({ email: req.params.email })
            .then((data) => {
                if (data) {
                    res.send('Email already exists');
                } else {
                    res.send('EmailOK');
                }
            })
            .catch((err) => console.log(err));
    },

    updatePassword: (req, res) => {
        AccountModel.updateOne(
            { email: req.body.email },
            {
                password: encode(req.body.password),
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

    getAllStaff: (req, res) => {
        AccountModel.find({ rank: { $in: ['Manager', 'Censor'] } })
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
module.exports = accountController;
