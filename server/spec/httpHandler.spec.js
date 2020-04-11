
const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const server = require('./mockServer');

const httpHandler = require('../js/httpHandler');



describe('server responses', () => {

  it('should respond to a OPTIONS request', (done) => {
    let {req, res} = server.mock('http://127.0.0.1:3001', 'OPTIONS');

    httpHandler.router(req, res);
    expect(res._responseCode).to.equal(200);
    expect(res._ended).to.equal(true);
    expect(res._data.toString()).to.be.empty;

    done();
  });

  it('should respond to a GET request for a swim command', (done) => {
    // write your test here

      let {req, res} = server.mock('http://127.0.0.1:3001', 'GET');



      httpHandler.router(req, res);
      expect(res._responseCode).to.equal(200);
      expect(res._ended).to.equal(true);
      expect(res._data.toString()).to.satisfy(function(response) {
        if ( res._data.toString() === 'up' || res._data.toString() === 'down' || res._data.toString() === 'left' || res._data.toString() === 'right' ) {
          return true
        }
        return false
      });

    done();
  });

  xit('should respond with 404 to a GET request for a missing background image', (done) => {
    httpHandler.backgroundImageFile = path.join('.', 'spec', 'missing.jpg');
    // fix fill me in
    let {req, res} = server.mock('http://127.0.0.1:3001', 'GET');

    httpHandler.router(req, res, () => {
      expect(res._responseCode).to.equal(404);
      expect(res._ended).to.equal(true);
      done();
    });
  });

  xit('should respond with 200 to a GET request for a present background image', (done) => {
    // write your test here
    done();
  });

  var postTestFile = path.join('.', 'spec', 'water-lg.jpg');

  xit('should respond to a POST request to save a background image', (done) => {
    fs.readFile(postTestFile, (err, fileData) => {
      httpHandler.backgroundImageFile = path.join('.', 'spec', 'temp.jpg');
      // fix fill me in
      let {req, res} = server.mock('http://127.0.0.1:3001', 'POST', fileData);

      httpHandler.router(req, res, () => {
        expect(res._responseCode).to.equal(201);
        expect(res._ended).to.equal(true);
        done();
      });
    });
  });

  xit('should send back the previously saved image', (done) => {
    fs.readFile(postTestFile, (err, fileData) => {
      httpHandler.backgroundImageFile = path.join('.', 'spec', 'temp.jpg');
      // fix fill me in
      let post = server.mock('http://127.0.0.1:3001', 'POST', fileData);
      // fix fill me in
      httpHandler.router(post.req, post.res, () => {
        let get = server.mock('http://127.0.0.1:3001', 'GET');
        httpHandler.router(get.req, get.res, () => {
          expect(Buffer.compare(fileData, get.res._data)).to.equal(0);
          done();
        });
      });
    });
  });
});
