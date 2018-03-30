var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]);
  console.log("req incoming, " + request.text);
  if(request.text) {
    var txt = request.text; 
    var spreadsheet = txt.test(/spreadsheet/,'i');
    var goodBot     = txt.test(/good\s*bot/,'i');
    this.res.writeHead(200);
    if(spreadsheet) {
      postMessage('spreadsheet url!');
    } else if(goodBot) {
      postMessage('awww, gee thanks :3');
    } else {
      //nth
    }
    this.res.end()
  }
}

function postMessage(msg) {
  var botResponse, options, body, botReq;

  botResponse = msg;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;