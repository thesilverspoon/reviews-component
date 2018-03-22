bkjw
require('newrelic');
const fs = require('fs');
const http = require('http');
const redis = require('redis');
const Promise = require('bluebird');
const db = require('../db/mongodb');


const html = fs.readFileSync('./react/dist/index.html', 'utf8');
const css = fs.readFileSync('./react/dist/reviews.css', 'utf8');
const bundle = fs.readFileSync('./react/dist/bundle.js', 'utf8');

const files = {
  'index.html': html,
  'reviews.css': css,
  'bundle.js': bundle,
};

const filePathsAndType = {
  '/': 'text/html',
  '/index.html': 'text/html',
  '/reviews.css': 'text/css',
  '/bundle.js': 'application/javascript',
};

const nodeServer = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url.startsWith('/restaurants')) {
    const id = Number(req.url.split('/')[2]);
    db.findByRestaurantId(id)
      .then((results) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        const jsonString = JSON.stringify(results);
        res.end(jsonString);
      })
      .catch((err) => {
        console.log(err.message);
        res.writeHead(500);
        res.end();
      });
  } else if (['/', '/index.html', '/reviews.css', '/bundle.js'].includes(req.url)) {
    res.writeHead(200, {
      'Content-Type': filePathsAndType[req.url],
    });
    res.end(req.url === '/' ? files['index.html'] : files[req.url.slice(1)]);
  } else {
    res.writeHead(404);
    res.end();
  }
});

const port = process.env.PORT || 8081;

nodeServer.listen(port, () => {
  console.log('nodeServer listening on', port);
});
