"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const PORT = process.env.PORT;
const connect = (port) => {
    return (0, http_1.createServer)()
        .listen(port, () => console.log('The server is running on port:', port));
};
connect(3000).on('request', (req, res) => {
    req.on('data', chunk => console.log('The server received data from the client.'));
});
function handleError(err) {
    if (err.code === 'ENOENT') {
        console.log('No such file exists.');
        return;
    }
    console.error('Error Log:', err);
}
