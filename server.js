const fs = require("fs");
const restify = require("restify");
// const Sentry = require('@sentry/node');
const sentryURL = require('./src/config/sentryConfig');
const cors = require("cors");
const catchError = require("./src/lib/utils/catchError")

// Sentry.init({ dsn: sentryURL });

let server = restify.createServer({
  http2: {
    cert: fs.readFileSync("./src/certs/localhost-cert.pem"),
    key: fs.readFileSync("./src/certs/localhost-key.pem"),
    ca: fs.readFileSync("./src/certs/localhost-csr.pem"),
    allowHTTP1: true
  }
});

server.use(cors({}))
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// Setup the routing
fs.readdirSync(`${__dirname}/src/routes`).map(file => {
  require(`./src/routes/${file}`)(server, catchError);
});

server.listen(8080, function() {
  console.log("ready on %s", server.url);
});
