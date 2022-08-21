const ReviewModel = require('../models/review.model');
const { makeId } = require('../utils');

const reviewController = {
    getAll: (req, res) => {
        ReviewModel.find({})
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500).json({ Err: err });
            });
    },

    getById: (req, res) => {
        ReviewModel.findOne({
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
            title: req.body.title,
            description: req.body.description,
            plot: req.body.plot,
            advantage: req.body.advantage,
            defect: req.body.defect,
            overview: req.body.overview,
            time: req.body.time,
            star: req.body.star,
            status: req.body.status,
            listComments: req.body.listComments,
            _userId: req.body._userId,
            _filmId: req.body._filmId,
            _censorId: req.body._censorId,
        };
        console.log(newTheater);
        ReviewModel.create(newTheater)
            .then((data) => {
                res.send('Successful');
            })
            .catch((err) => {
                res.status(500).json({ Err: err });
            });
    },

    update: (req, res) => {
        ReviewModel.updateOne(
            { _id: req.body._id },
            {
                title: req.body.title,
                description: req.body.description,
                plot: req.body.plot,
                advantage: req.body.advantage,
                defect: req.body.defect,
                overview: req.body.overview,
                time: req.body.time,
                star: req.body.star,
                status: req.body.status,
                isVisible: req.body.isVisible,
                listComments: req.body.listComments,
                _userId: req.body._userId,
                _filmId: req.body._filmId,
                _censorId: req.body._censorId,
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
        ReviewModel.deleteOne({
            _id: req.params.id,
        })
            .then((data) => {
                res.json('Delete successful');
            })
            .catch((err) => {
                res.status(500).json('Delete error');
            });
    },

    insertCmt: (req, res) => {
        const cmtObj = {
            id: makeId(6),
            message: req.body.message,
            time: req.body.time,
            _userId: req.body._userId,
        };
        ReviewModel.findByIdAndUpdate(req.body._reviewId, { $push: { listComments: cmtObj } })
            .then((data) => {
                res.json('Cmt successful');
            })
            .catch((err) => {
                res.status(500).json('Cmt error');
            });
    },
    deleteCmt: (req, res) => {
        ReviewModel.findByIdAndUpdate(req.body._id, { $pull: { listComments: { id: req.body.cmtId } } })
            .then((data) => {
                res.json('Delete comment successful');
            })
            .catch((err) => {
                res.status(500).json('Delete error');
            });
    },
};
module.exports = reviewController;
