/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

//we need to handle all the GET requests.
//endpoints with responses
//specify methods in request handler functions, and endpoints
//for a get method, if we receive get reuqest, and we get the right url, then send back this data
//for our post ... if the method is post && the endpoint is what we expect, then push data to a storage
//AJAX is making request, will be attached with method and endpoint (things included in AJAX request)
//read through node documentation to access the data in a request
//the response is what we are going to send back
//read about status codes 400 for error 3/5 for csuccess...
//FIRST parse through the url to find endpoints (string matching)
//SECOND go through the methods (start with GET) akakakaka ((((request.method (just a string)))))(go to AJAX request and see what you can access)

//failed fetch message if the data is not was expected

var allMessages = [];
var testMessage = JSON.stringify(allMessages);
var requestHandler = function(request, response) {

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';
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
  // console.logs in your code.request
  //use string method for request POST method vs array buffers
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

//catch all if else if nothing matches
//return 404
  if (request.url === '/classes/messages') { /* Check the urls end points to match the string of /classes/messages */

    if (request.method === 'GET') {
      var statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end(testMessage);
    }
     console.log('inside if statment');

    if (request.method === 'POST') {
      console.log('inside POSt');
       var body = '';
       request.on('data', function (data) {
         body += data;
// parse out string, store in array
         body = JSON.parse(body);
         allMessages.unshift(body);
         testMessage = JSON.stringify(allMessages);
         /// send a response to the client that we recived the data and submitted it into our database
         response.writeHead(201, headers);
         response.end('We got the POST request');
       });
    }

       if (request.method === 'OPTIONS') {
          console.log('inside OPTIONS');
           response.writeHead(200, headers);
           response.end('We got the OPTIONS request');
         }



  } else {
  //send 404
  var statusCode = 404;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = 'text/plain';
    response.writeHead(statusCode, headers);
    response.end('404 Error this is bad');
  }


  // The outgoing status. //apparently 200 means everything is good
 // var statusCode = 200;

  // See the note below about CORS headers.
 // var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
 // headers['Content-Type'] = 'application/json';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  //response.writeHead(statusCode, headers);
  //response.write("What is up ");
  //response.write(' hello checking if this is working ');
  //response.write(testMessage);
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  //response.end(testMessage); //this is how we send back data
  //read the nodejs file that is linked to figure out response.end and writehead responses

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk tos websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

//module.export.requuest-handler = request -handler
module.exports.requestHandler = requestHandler;

