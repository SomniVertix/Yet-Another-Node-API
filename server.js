const fs = require('fs');
const express = require('express');
const https = require('https');
const app = express();
// const Sentry = require('@sentry/node');
// const sentryURL = require("./sentry/sentryConfig");
// const catchError = require("./src/lib/utils/catchError");
// const cors = require('cors');

// Sentry.init({ dsn: sentryURL });

const options = {
  key: fs.readFileSync('./src/certs/localhost-key.pem'),
  cert: fs.readFileSync('./src/certs/localhost-cert.pem'),
};

fs.readdirSync(`${__dirname}/src/routes`).map((file) => {
  require(`./src/routes/${file}`)(app);
});

https
    .createServer(options, app)
    .listen(8080);
