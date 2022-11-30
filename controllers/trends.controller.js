/* eslint-disable*/
const googleTrends = require('google-trends-api');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const options = {
    method: 'GET',
    headers: {
        baseUrl: 'https://api.themoviedb.org/3/',
        apiKey: '2334810ccf8f48afd51dacfae975dacd',
    },
};

const googleTrendsController = {
    dailyTrends: (req, res) => {
        googleTrends
            .dailyTrends({
                geo: req.params.geo,
            })
            .then(async (results) => {
                const data = JSON.parse(results);
                const trendingSearchersDaysList = data.default.trendingSearchesDays;
                const trendingSearchersList = trendingSearchersDaysList.map((item) => item.trendingSearches);
                const queries = [];
                trendingSearchersList.forEach((array) => {
                    array.forEach((item) => {
                        queries.push(item.title.query);
                    });
                });

                let keywordsRes = [];
                const listPromise = [];
                queries.data.forEach((trendsWord) => {
                    listPromise.push(searchListKeyword(trendsWord));
                });

                const resKeyword = await Promise.all(listPromise);

                console.log(resKeyword);

                for (let i = 0; i < resKeyword.length; i++) {
                    if (resKeyword[i].total_results !== 0) {
                        keywordsRes.push({
                            trend: res.data[i],
                            result: resKeyword[i],
                        });
                    }
                }

                console.log('keywordRes', resKeyword);

                // keywordsRes.map((trendsWordCollection) => {
                //     let tmpList = [];
                //     const getListKW = () => {
                //         trendsWordCollection.result.results.forEach((item) => tmpList.push({ item }));
                //         return tmpList;
                //     };
                //     listKeyword.push({
                //         trend: trendsWordCollection.trend,
                //         list: getListKW(),
                //     });
                // });

                // let dictionary = [];
                // if (listKeyword.length !== 0) {
                //     setNumKW(listKeyword.length);
                //     listKeyword.forEach(async (trendKW) => {
                //         let listPromise = [];
                //         trendKW.list.forEach((keyword) => {
                //             listPromise.push(discoverWithKeyword(keyword.item.id, selectedCountry.code));
                //         });
                //         const discoverRes = await Promise.all(listPromise);

                //         dictionary.push({
                //             keyword: trendKW.trend,
                //             movies: discoverRes[0].results,
                //         });
                //     });
                // }

                // res.json(dictionary);
            })
            .catch((err) => {
                res.status(500).send({ Err: err });
            });
    },
};

const searchListKeyword = (trendsWord) => {
    const url = `${options.headers.baseUrl}search/keyword?api_key=${options.headers.apiKey}&query=${trendsWord}&page=1`;

    fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
        })
        .catch((err) => console.error('error:' + err));
};

const discoverWithKeyword = (keyword, countryCode) => {
    const url = `${options.headers.baseUrl}discover/movie?api_key=${options.headers.apiKey}&language=en-US&region=${countryCode}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_keywords=${keyword}&with_watch_monetization_types=flatrate`;

    fetch(url, options)
        .then((res) => res.json())
        .then((json) => json)
        .catch((err) => console.error('error:' + err));
};
module.exports = googleTrendsController;
