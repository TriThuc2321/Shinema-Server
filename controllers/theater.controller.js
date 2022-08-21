const TheaterModel = require('../models/theater.model');

const theaterController = {
    getAll: (req, res) => {
        TheaterModel.find({})
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500).json({ Err: err });
            });
    },

    getById: (req, res) => {
        TheaterModel.findOne({
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
        const newTheater = {
            name: req.body.name,
            address: req.body.address,
            contact: req.body.contact,
            managerId: req.body.managerId,
            price: req.body.price,
            listRoom: req.body.listRoom,
        };
        TheaterModel.create(newTheater)
            .then((data) => {
                res.send('Successful');
            })
            .catch((err) => {
                res.status(500).json({ Err: err });
            });
    },

    update: (req, res) => {
        TheaterModel.updateOne(
            { id: req.params.id },
            {
                name: req.body.name,
                address: req.body.address,
                contact: req.body.contact,
                managerId: req.body.managerId,
                price: req.body.price,
                listRoom: req.body.listRoom,
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
        TheaterModel.deleteOne({
            id: req.params.id,
        })
            .then((data) => {
                res.json('Delete successful');
            })
            .catch((err) => {
                res.status(500).json('Delete error');
            });
    },
};
module.exports = theaterController;
