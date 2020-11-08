const fs = require('fs').promises;
const express = require('express')

let weather_counterfactual_path = './JSON/Weather_Counterfactual.json';
let weather_naive_guide_path = './JSON/Weather_Naive_guide.json';
let weather_sample_path = './JSON/Weather_Sample.json';

exports.getData = (async function (req, res) {

    try {
        const data =
            await fs.readFile(__dirname + '/JSON/' + req.params.filename + '.json');

        const json =
            JSON.parse(data);

        const graphData =
            prepareData(json.Data, req.params.featureName);

        res.setHeader('Content-Type', 'application/json');
        res.send(graphData);
    }
    catch (ex) {
        console.error(ex);
        res.status(500).send('Something internally failed, see logs for details', ex);
    }
})

function prepareData(weatherData, featureName) {

    let featureDataArr = [];

    for (const [key, value] of Object.entries(weatherData)) {
        featureDataArr.push(weatherData[key][featureName]);
    }

    return featureDataArr;
}

exports.getUserData = (async function (req, res) {

    try {

        const data =
            await fs.readFile(__dirname + '/JSON/' + req.params.filename + '.json');

        const userData =
            JSON.parse(data);


        res.setHeader('Content-Type', 'application/json');
        res.send(userData);
    }
    catch (ex) {
        console.error(ex);
        res.status(500).send('Something internally failed, see logs for details', ex);
    }
})
