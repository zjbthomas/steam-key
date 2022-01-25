const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const basicAuth = require('express-basic-auth')

try {
    require('./config');
} catch (err) {
    console.log('请复制config.example.json为config.json并编辑配置！');
    process.exit(1);
}

process.on('uncaughtException', err => console.error(err));

/* Authentication */
app.use(basicAuth({
    users: { 'admin': 'supersecret' }, // Change here when deployed
    challenge: true // <--- needed to actually show the login dialog!
}))

/* Web Server */
let web = require('./web')(app);

/* WebSocket Server */
let ws = require('./ws')(server);

server.listen(9155, () => {
    console.log('Listening on %d', server.address().port);
});
