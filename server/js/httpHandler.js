const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url' + req.url);
    if (req.method === 'GET') {
      var randomNumber = Math.floor(Math.random(1,4))
      if(randomNumber === 1) {
        res.write('up')
      } else if (randomNumber === 2) {
        res.write('down')
      } else if (randomNumber === 3) {
        res.write('left')
      } else if (randomNumber === 4) {
        res.write('right')
      }
      //res.write('up'||'down'||'left'||'right')
    }
  res.writeHead(200, headers);
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};



