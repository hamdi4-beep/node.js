"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const http_1 = require("http");
const server = (0, http_1.createServer)();
server.listen(3000, 'localhost', () => console.log('The server is up and running'));
server.on('request', (req, res) => {
    (0, fs_1.createReadStream)('package.json')
        .on('data', chunk => res.write(chunk))
        .on('end', () => res.end());
});
