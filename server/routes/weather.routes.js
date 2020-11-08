module.exports=function(app){

    let weatherData=require('../controllers/readJsonFileController.js')
    const express = require('express');
    const cors = require('cors');
    
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());

    app.get('/api/getData/:filename/:featureName',weatherData.getData);
    app.get('/api/getUserData/:filename/',weatherData.getUserData);

}