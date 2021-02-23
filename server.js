const path = require('path');
const express = require('express');
const app = express();

app.use('/', express.static(path.join(__dirname, 'bootstrap/dist')));
app.use('/mfe/welcome', express.static(path.join(__dirname, 'welcome/dist')));
app.use('/mfe/music', express.static(path.join(__dirname, 'music/build')));

module.exports = app;
