/**
 * app.js
 *
 * This file contains some conventional defaults for working with Socket.io + Sails.
 * It is designed to get you up and running fast, but is by no means anything special.
 *
 * Feel free to change none, some, or ALL of this file to fit your needs!
 */

(function (io) {
  var socket = io.connect();
  socket.on('connect', function socketConnected() {
    socket.on('message', function messageReceived(message) {
      log('New comet message received :: ', message);
    });
  });

  window.socket = socket;

  function log () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }
})(window.io);