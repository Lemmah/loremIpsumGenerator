// Problem: We need to have a simple site to generate lorem ipsum text with specified paragraphs, words, or letters.
// Solution: Use Node.js to serve up the required files and handle the logic to generate the required lorem ipsum text
const http = require('http');
const router = require('./scripts/router.js');

const server = http.createServer((request, response) => {
  console.log(request.method, request.url);
  router.route(request, response);
  response.end();
});
server.on('clientError', (error, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);