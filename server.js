const path = require('path');
const express = require('express');

const app = express();

app.use('/mfe/welcome', express.static(path.join(__dirname, 'welcome/dist')));
app.use('/mfe/music', express.static(path.join(__dirname, 'music/build')));
app.use('/', express.static(path.join(__dirname, 'bootstrap/dist')));

app.all('/*', function(req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, 'bootstrap/dist') });
});

app.listen(3000, () => console.log('Server listening on port 3000'))

