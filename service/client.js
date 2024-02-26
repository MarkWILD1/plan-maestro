const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/query?userQuery=test',
  method: 'GET',
};

const req = http.request(options, (res) => {
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`Response: ${chunk}`);
  });
});

req.on('error', (error) => {
  console.error(`Problem with request: ${error.message}`);
});

req.end();