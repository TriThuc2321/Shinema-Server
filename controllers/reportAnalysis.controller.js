const ReportAnalysisModel = require('../models/reportAnalysis.model');
const url = require('url');

const LIMIT = 10;
const reportAnalysisController = {
    getAll: (req, res) => {
        ReportAnalysisModel.find({})
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500).json({ Err: err });
            });
    },

    getOrderByCount: async (req, res) => {
        const queryData = url.parse(req.url, true).query;
        const page = queryData?.page || 1;
        const limit = queryData?.limit || LIMIT;

        try {
            const report = await ReportAnalysisModel.find()
                .sort({ count: 'desc' })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();
            const total = await ReportAnalysisModel.countDocuments().exec();
            const result = {
                total,
                page,
                limit,
                report,
                pageSize: report.length,
            };
            res.send(result);
        } catch (err) {
            res.send(err);
        }
    },

    getOrderByDate: async (req, res) => {
        const queryData = url.parse(req.url, true).query;
        const page = queryData?.page || 1;
        const limit = queryData?.limit || LIMIT;

        try {
            const report = await ReportAnalysisModel.find()
                .sort({ updatedAt: 'desc' })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();
            const total = await ReportAnalysisModel.countDocuments().exec();
            const result = {
                total,
                page,
                report,
                limit,
                pageSize: report.length,
            };
            res.send(result);
        } catch (err) {
            res.send(err);
        }
    },

    getById: (req, res) => {
        ReportAnalysisModel.findOne({
            _id: req.params.id,
        })
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                res.status(500).json({ Err: err });
            });
    },

    update: (req, res) => {
        ReportAnalysisModel.updateOne(
            { _id: req.body._id },
            {
                title: req.body.title,
                _filmId: req.body._filmId,
                count: req.body.count,
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

    plusCount: (req, res) => {
        ReportAnalysisModel.findOne({ _filmId: req.body._filmId }).then((data) => {
            if (data) {
                ReportAnalysisModel.updateOne(
                    { _filmId: req.body._filmId },
                    {
                        $inc: { count: +1 },
                    },
                    { new: 'true' },
                )
                    .then((data) => {
                        res.json('Update successful');
                    })
                    .catch((err) => {
                        res.status(500).json({ Err: err });
                    });
            } else {
                const newReport = {
                    title: req.body.title,
                    _filmId: req.body._filmId,
                    count: 1,
                };
                ReportAnalysisModel.create(newReport)
                    .then((data) => {
                        res.send('Successful');
                    })
                    .catch((err) => {
                        res.status(500).json({ Err: err });
                    });
            }
        });
    },

    deleteById: (req, res) => {
        ReportAnalysisModel.deleteOne({
            _id: req.params.id,
        })
            .then((data) => {
                res.json('Delete successful');
            })
            .catch((err) => {
                res.status(500).json('Delete error');
            });
    },
};
module.exports = reportAnalysisController;
