'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const Tabletop = require('tabletop');
const spreadsheetURL = 'https://docs.google.com/spreadsheets/d/1s04Abd0bfNFVYOU-_8pnsTqq1N8mbYDpT5iYnzYlPas/edit?usp=sharing'

const router = express.Router();

app.get("/", async (req, res, next) => {
  console.log('1')
  const data = await getSpreadsheetData()


  res.json({ data: data })

});

async function getSpreadsheetData() {
  const d = await Tabletop.init({
    key: spreadsheetURL,
    simpleSheet: true
  }
  ).then(function (data, tabletop) {

    return data
  })
  return d
}


app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
