/* eslint-disable linebreak-style */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

const PORT = process.env.PORT || process.env.URL_SERVER;
const cors = require('cors');
app.use(cors());

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB Connected!');
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('err', err);
    });

const emailRouter = require('./routes/email.routes');
app.use('/api/sendMail', emailRouter);

const accountRouter = require('./routes/account.routes');
app.use('/api/account/', accountRouter);

const showTimeRouter = require('./routes/showTime.routes');
app.use('/api/showTime/', showTimeRouter);

const theaterRouter = require('./routes/theater.routes');
app.use('/api/theater/', theaterRouter);

const ticketRouter = require('./routes/ticket.routes');
app.use('/api/ticket/', ticketRouter);

const reviewRouter = require('./routes/review.routes');
app.use('/api/review/', reviewRouter);

const cloudinary = require('./routes/cloudinary.routes');
app.use('/api/cloudinary', cloudinary);

const dialogFlowRouter = require('./routes/dialogFlow.routes');
app.use('/api/dialogFlow/', dialogFlowRouter);

const trendsRouter = require('./routes/trends.routes');
app.use('/api/trends', trendsRouter);
