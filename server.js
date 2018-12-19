// server.js
// where your node app starts

// init project
const express = require('express');
const bodyParser = require('body-parser');
const validator = require('validator');
const dns = require('dns');
const app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.json());
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

let array = [];

//Post Route for url
app.post('/api/shorturl/new', (req, res) => {
  let link = req.body.URL;
  if (validator.isURL(link)) {
    array.push(link);
    res.send({ original_url: link, short_url: array.length - 1 });
  } else {
    res.send({ error: 'invalid URL' });
  }
});

function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = 'http://' + url;
  }
  return url;
}

//Get short url
app.get('/api/shorturl/:id', (req, res) => {
  let shorturl = req.params.id;
  let link = array[parseInt(shorturl)];
  link = addhttp(link);
  res.redirect(link);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
