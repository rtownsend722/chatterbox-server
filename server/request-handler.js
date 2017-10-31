/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/



// { '{"username":"joe","text":"hi","roomname":"lobby"}{"username":"joe","text":"hi","roomname":"lobby"}': '' }
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

var qs = require('querystring');
var url = require('url');
var storage = [{username: 'groucho', roomname: 'bedroom', text: 'grumble grumble'}];
var statusCode = 200;
var headers = defaultCorsHeaders;
headers['Content-Type'] = 'text/plain';

var handlePost = function(request, response) {
  // console.log(response._data);
  //TODO: pass in date and other metadata from the header
  //parse the data into object form from the JSON string
  var data = [];
  request.on('data', function(chunk) {
    data.push(chunk);
  }).on('end', function() {
    data = Buffer.concat(data).toString();
    data = JSON.parse(data);
    //push the data into the storage array
    storage.push(data);
  });
  //statusCode 201 for post successful
  statusCode = 201;
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

var handleGet = function(request, response) {
  //TODO: find a way to order based on the order property
  //parse the data into object form from the JSON string to get the order property
  var output = {results: []};
  // var data = [];
  // request.on('data', function(chunk) {
  //   data.push(chunk);
  // }).on('end', function() {
  //   data = Buffer.concat(data).toString();
  //   data = JSON.parse(data); // {order: '-createdAt'}
  // });


  //TODO: refactor to sort by order, up with positive, down with negative
  //if (data[order] === '-createdAt'
  
  //iterate backwards in our array
  for (var i = storage.length - 1; i >= 0; i--) {
    //append each value to output array
    output['results'].push(storage[i]);
  }


  //statusCode 200 for post successful
  statusCode = 200;
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(output));
};

var requestHandler = function(request, response) {
  //TODO: Why do we bother differentiating between messages and room????
  if (request.url.split('?')[0] === '/classes/messages' || request.url.split('?')[0] === '/classes/room') {
    if (request.method === 'POST') {
      handlePost(request, response);
    } else if (request.method === 'GET') {
      handleGet(request, response);
    } else if (request.method === 'OPTIONS') {
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end('Allow: GET, POST, OPTIONS');
    } else {
      statusCode = 400;
      response.writeHead(statusCode, headers);
      response.end();
    }
  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  }

  // See the note below about CORS headers.
  

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  //if method isn't post or get
};


module.exports.requestHandler = requestHandler;

