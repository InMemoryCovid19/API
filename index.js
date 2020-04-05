
// const log = require('./services/logger');
const config = require('./config');
const express = require('express');
const express_enforces_ssl = require('express-enforces-ssl');
const fs = require('fs');
const https = require('https');
const router = require('./routes');

const app = express();

if(config.trustProxy === 'yes'){
    app.enable('trust proxy');
}

if(config.enforceSSL === 'yes'){
app.use(express_enforces_ssl());
}

app.use('/',router);

const key = fs.readFileSync(__dirname + '/certs/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt');
const options = {
  key: key,
  cert: cert
};

app.get('/', (req, res) => {
   res.send('Now using https..');
});

const server = https.createServer(options, app);
server.listen(config.port, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.info('API server listening on host '+host+', port '+port+'!'); 
    // TODO: Use winston logger
});