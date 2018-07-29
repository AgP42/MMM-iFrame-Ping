/* Magic Mirror
 * Module: iFrame-Ping
 *
 * By AgP42
 * 
 * This is a modified version from MMM-ping by Christopher Fenner https://github.com/CFenner
 * MIT Licensed.
 */
 
var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
  start: function () {
    console.log(this.name + ' helper started ...');
    this.lastConnection = new Date(); //on considere un ping ok au start-up...
    
  },
  
  socketNotificationReceived: function(notification, payload) {
    //console.log(notification);
    if (notification === 'PING_REQUEST') {
      var that = this;
      request({
          url: payload,
          method: 'GET'
        }, function(error, response, body) {
          if (!error && response.statusCode == 200) {
            that.lastConnection = new Date(); //success, we record the new date
          }
          //whatever the answer, we send the answer back to main file with status and lastConnection timestamp
          that.sendSocketNotification('PING_RESPONSE', {
              status: !error && response.statusCode == 200?"OK":"ERROR",
              lastConnection: that.lastConnection
          });
        }
      );
    }   
  }
});
