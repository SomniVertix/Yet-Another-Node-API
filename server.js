const fs = require("fs");
const restify = require("restify");
// const Sentry = require('@sentry/node');
const sentryURL = require('./sentry/sentryConfig');
const cors = require("cors")


// Sentry.init({ dsn: sentryURL });

let server = restify.createServer({
  http2: {
    cert: fs.readFileSync("./auth/localhost-cert.pem"),
    key: fs.readFileSync("./auth/localhost-key.pem"),
    ca: fs.readFileSync("./auth/localhost-csr.pem"),
    allowHTTP1: true
  }
});

server.use(cors({}))
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// Setup the routing
fs.readdirSync(`${__dirname}/routes`).map(file => {
  require(`./routes/${file}`)(server);
});

server.listen(8080, function() {
  console.log("ready on %s", server.url);
});
