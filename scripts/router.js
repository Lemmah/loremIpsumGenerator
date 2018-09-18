const fs = require('fs');
const querystring = require('querystring');
const indexHtml = fs.readFileSync('./views/index.html', {encoding: 'utf8'});

/**
 * Gets resources that are fetchable. ie Static files and query result.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
const fetchResource = (request, response) => {
  const isQuery = /^\/\?\w+\=\w+\&\w+\=\w+$/.test(request.url);
  const isStatic = /^\/\w+\/\w+\.\w+$/.test(request.url);
  console.log(request.url, isQuery);
  if (isQuery) {
    const query = querystring.parse(request.url.slice(2));
    console.log(query);
    response.writeHead(200, {'Content-type': 'text/html'});
    response.write(indexHtml);
  } else if(isStatic) {
    const resource = fs.readFileSync(`.${request.url}`);
    response.write(resource);
  }
}

/**
 * Routes requests to the various resources.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 */
const route = (request, response) => {
  if (request.url === '/') {
    response.writeHead(200, {'Content-type': 'text/html'});
    response.write(indexHtml);
  } else {
    fetchResource(request, response);
  }
}

module.exports.route = route;