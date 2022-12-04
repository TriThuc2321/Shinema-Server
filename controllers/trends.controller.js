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

                const urls = queries.map((trendsWord) => searchListKeyword(trendsWord));

                const resKeyword = await Promise.all(
                    urls.map(async (url) => {
                        const res = await fetch(url);
                        return res.json();
                    }),
                );

                const keywordsRes = [];
                for (let i = 0; i < resKeyword.length; i++) {
                    if (resKeyword[i].total_results !== 0) {
                        keywordsRes.push({
                            trend: queries[i],
                            result: resKeyword[i],
                        });
                    }
                }

                const listKeyword = [];

                keywordsRes.map((trendsWordCollection) => {
                    let tmpList = [];
                    const getListKW = () => {
                        trendsWordCollection.result.results.forEach((item) => tmpList.push({ item }));
                        return tmpList;
                    };
                    listKeyword.push({
                        trend: trendsWordCollection.trend,
                        list: getListKW(),
                    });
                });

                const dictionary = [];

                const getMovie = async () => {
                    if (listKeyword.length !== 0) {
                        // await listKeyword.forEach(async (trendKW) => {
                        //     const listUrl = trendKW.list.map((keyword) =>
                        //         discoverWithKeyword(keyword.item.id, req.params.geo),
                        //     );
                        //     const discoverRes = await Promise.all(
                        //         listUrl.map(async (url) => {
                        //             const res = await fetch(url);
                        //             return res.json();
                        //         }),
                        //     );

                        //     const listMovie = [];
                        //     discoverRes.forEach((item) => {
                        //         if (item.total_results !== 0) {
                        //             listMovie.push(...item.results);
                        //         }
                        //     });

                        //     console.log('aaaaaaaa');

                        //     dictionary.push({
                        //         keyword: trendKW.trend,
                        //         movies: listMovie,
                        //     });
                        // });

                        for (trendKW of listKeyword) {
                            const listUrl = trendKW.list.map((keyword) =>
                                discoverWithKeyword(keyword.item.id, req.params.geo),
                            );
                            const discoverRes = await Promise.all(
                                listUrl.map(async (url) => {
                                    const res = await fetch(url);
                                    return res.json();
                                }),
                            );

                            const listMovie = [];
                            discoverRes.forEach((item) => {
                                if (item.total_results !== 0) {
                                    listMovie.push(...item.results);
                                }
                            });

                            if (listMovie.length !== 0) {
                                dictionary.push({
                                    keyword: trendKW.trend,
                                    movies: listMovie,
                                });
                            }
                        }
                    }
                };

                await getMovie();

                res.json(dictionary);
                //res.json(dictionary);
            })
            .catch((err) => {
                res.status(500).send({ Err: err });
            });
    },
};

const searchListKeyword = (trendsWord) =>
    `${options.headers.baseUrl}search/keyword?api_key=${options.headers.apiKey}&query=${trendsWord}&page=1`;

const discoverWithKeyword = (keyword, countryCode) =>
    `${options.headers.baseUrl}discover/movie?api_key=${options.headers.apiKey}&language=en-US&region=${countryCode}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_keywords=${keyword}&with_watch_monetization_types=flatrate`;

module.exports = googleTrendsController;
