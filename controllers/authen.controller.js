const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.authenToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).send('Unauthorized');
        return;
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) {
            res.status(401).send('Unauthorized');
            return;
        }
        next();
    });
};
