const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { encode } = require('base-64');

const JWTModel = require('../models/JWTRefToken.model');
const AccountModel = require('../models/account.model');

router.post('/refreshToken', (req, res) => {
    // const refreshToken = req.cookies.refresh_token;
    const refreshToken = req.body.token;
    if (!refreshToken) {
        res.status(401);
        return;
    }

    JWTModel.find({
        refreshToken: refreshToken,
    })
        .then((data) => {
            if (data.length != 0) {
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, daa) => {
                    if (err) {
                        res.sendStatus(401);
                        return;
                    } else {
                        const accessToken = jwt.sign(
                            { email: daa.email, rank: daa.rank },
                            process.env.ACCESS_TOKEN_SECRET,
                            {
                                expiresIn: '10s',
                            },
                        );
                        res.json({ accessToken });
                    }
                });
            } else {
                res.sendStatus(401);
            }
        })
        .catch((err) => console.log(err));
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = encode(req.body.password);

    AccountModel.findOne({
        email: email,
    })
        .then((data) => {
            if (data) {
                if (data.password == password) {
                    const payload = {
                        email: email,
                        rank: data.rank,
                    };

                    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
                    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

                    // res.cookie('access_token', accessToken, {
                    //     maxAge: 60 * 1000,
                    //     httpOnly: true,
                    //     //secure: true
                    // })
                    // res.cookie('refresh_token', refreshToken, {
                    //     maxAge: 365 * 24 * 60 * 60 * 1000,
                    //     httpOnly: true,
                    //     //secure: true
                    // })

                    const _JWTRefTokens = new JWTModel({
                        refreshToken: refreshToken,
                    });

                    JWTModel.create(_JWTRefTokens)
                        .then((data) => {
                            res.send({ accessToken, refreshToken });
                            return;
                        })
                        .catch((err) => {
                            res.status(500).json({ Err_token: err });
                        });
                } else {
                    res.json('Password incorrect');
                    return;
                }
            } else {
                res.json('Email not exist');
                return;
            }
        })
        .catch((err) => {
            res.status(500).json({ Err_email: err });
        });
});

router.post('/logout', (req, res) => {
    JWTModel.deleteOne({
        refreshToken: req.body.token,
    })
        .then((data) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.status(500).json('Delete error');
        });
});

router.get('/', (req, res) => {
    res.status(200).json('Start authen successful');
});

module.exports = router;
