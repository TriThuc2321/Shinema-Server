/* eslint-disable linebreak-style */
const express = require('express');
const router = express.Router();
// const structjson = require('./structjson.js')
const dialogflow = require('dialogflow');
// const uuid = require('uuid');

const dotenv = require('dotenv');
dotenv.config();

const projectId = process.env.GOOGLE_PROJECT_ID;
const sessionId = process.env.DIALOGFLOW_SESION_ID;
const languageCode = process.env.DIALOGFLOW_LANGUAGE_CODE;

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

router.post('/textQuery', async (req, res) => {
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: req.body.text,
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    res.send(result);
});

module.exports = router;
