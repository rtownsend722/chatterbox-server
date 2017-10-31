/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/



// { '{"username":"joe","text":"hi","roomname":"lobby"}{"username":"joe","text":"hi","roomname":"lobby"}': '' }

var qs = require('querystring');
var url = require('url');
var storage = [];

var handlePost = function(request, response) {
  //TODO: pass in date and other metadata from the header
  //parse the data into object form from the JSON string
  //push the data into the storage array
  //statusCode 201 for post successful
};

var handleGet = function(request, response) {
  //TODO: find a way to order based on the order property
  //parse the data into object form from the JSON string to get the order property
  //iterate backwards in our array
  //append each value to output array
  //statusCode 200 for post successful
};

var requestHandler = function(request, response) {

  var data = [];

  if (request.method === 'POST') {
    request.on('data', function(chunk) {
      data.push(chunk);
    }).on('end', function() {
      data = Buffer.concat(data).toString();
      console.log(data);
    });
  }
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  // The outgoing status.
  var statusCode;
  if (request.url !== '/classes/messages?order=-createdAt') {
    statusCode = 404;
  } else {
    statusCode = 200;
  }

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'text/plain';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  var message = {
    username: 'Rebecca',
    text: 'Hello world!',
    roomname: 'lobby',
    objectId: 1
  };
  var message2 = {
    username: 'Brendon',
    text: 'Hello world!',
    roomname: 'lobby',
    objectId: 2
  };

  //if method isn't post or get
  response.end(JSON.stringify({results: [message2, message]}));
/*
    var message = {
      username: app.username,
      text: app.$message.val(),
      roomname: app.roomname || 'lobby'
    };
*/
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  //TODO, specify cross-origin url for our chat client
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports.requestHandler = requestHandler;

