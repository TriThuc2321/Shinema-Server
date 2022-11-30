/* eslint-disable*/
const googleTrends = require('google-trends-api');

const googleTrendsController = {
    dailyTrends: (req, res) => {
        googleTrends
            .dailyTrends({
                geo: req.params.geo,
            })
            .then((results) => {
                const data = JSON.parse(results);
                const trendingSearchersDaysList = data.default.trendingSearchesDays;
                const trendingSearchersList = trendingSearchersDaysList.map((item) => item.trendingSearches);
                const queries = [];
                trendingSearchersList.map((array) => {
                    array.map((item) => {
                        queries.push(item.title.query);
                    });
                });
                res.json(queries);
            })
            .catch((err) => {
                res.status(500).send({ Err: err });
            });
    },
};
module.exports = googleTrendsController;
