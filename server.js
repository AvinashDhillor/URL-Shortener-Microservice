// server.js
// where your node app starts

// init project
const express = require('express');
const dotenv = require('dotenv').config();
const { mongoose } = require('./db/connect/mongoose');
const { Url } = require('./db/model/Url');
const bodyParser = require('body-parser');
const validator = require('validator');
const crypto = require('crypto');
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
  let shorturl;
  if (validator.isURL(link)) {
    // array.push(link);
    // res.send({ original_url: link, short_url: array.length - 1 });
    Url.findOne({ url: link }).then(data => {
      if (data) {
        shorturl = data.shorturl;
      } else {
        shorturl = crypto.randomBytes(4).toString('hex');
        let newrecord = new Url({
          url: link,
          shorturl: shorturl
        });

        newrecord.save();
      }
      res.send({ original_url: link, short_url: shorturl });
    });
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
  // let link = array[parseInt(shorturl)];
  // return res.redirect(link);
  Url.findOne({ shorturl: shorturl })
    .then(url => {
      return res.redirect(url.url);
    })
    .catch(e => res.send({ error: 'Invalid URL' }));
});

// listen for requests :)
const listener = app.listen(3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
