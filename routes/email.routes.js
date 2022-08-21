const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/verify', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shinemaapplication@gmail.com',
            pass: 'pjhiouvifzydilug',
        },
    });

    const mailOptions = {
        from: 'shinemaapplication@gmail.com',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.send(error);
        } else {
            res.send(info.response);
        }
    });
});

module.exports = router;
