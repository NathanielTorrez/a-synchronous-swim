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
      // call the writeHead function and the write function
      var randomCommand = randomOutput()
      res.writeHead(200,headers)
      res.write(randomCommand)
     // module.exports.initialize(randomCommand)
    } else if (req.method === 'OPTIONS') {
      res.writeHead(200, headers);
    }
  res.end();
  next(); // invoke next() at the end of a request to help with testing!



//   var message = messageQueue.dequeue();

//   if(message !== undefined){
//     res.writeHead(200,headers);
//     res.end(message);
//   }else{
//     res.writeHead(200,headers);
//     res.end("");
//   }
//   res.writeHead(200,headers)
//  res.end()
 }


 // create a random swim command generator
randomOutput = () => {
  var randomNumber = Math.floor(Math.random() * (4 - 1 + 1) - 1)

  if (randomNumber === 1) {
    return 'up'
  } else if (randomNumber === 2) {
    return 'down'
  } else if (randomNumber === 3) {
    return 'left'
  } else if (randomNumber === 4) {
    return 'right'
  } else { return 'up'}
};