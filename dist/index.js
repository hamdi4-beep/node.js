"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const http_1 = require("http");
const path_1 = require("path");
const server = (0, http_1.createServer)((req, res) => {
    if (req.method !== 'GET') {
        res
            .writeHead(405, textPlainMMETYPE)
            .end('Only GET requests are allowed.');
        return;
    }
    sendImage('client/assets/image.jpg');
    function sendImage(path) {
        path = (0, path_1.join)(...path.split('/'));
        (0, fs_1.createReadStream)(path)
            .on('error', (err) => {
            if (err.code === 'ENOENT') {
                res
                    .writeHead(404, textPlainMMETYPE)
                    .end('No such resource was found.');
            }
            console.error(err);
            res
                .writeHead(500, textPlainMMETYPE)
                .end('Internal Error');
        })
            .on('open', () => res.writeHead(200, {
            'Content-Type': 'image/jpeg'
        }))
            .pipe(res);
    }
});
server.listen(3000, () => console.log('The server is running on port 3000'));
const textPlainMMETYPE = {
    'Content-Type': 'text/plain'
};
