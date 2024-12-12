"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const http_1 = require("http");
const path_1 = require("path");
const server = (0, http_1.createServer)((req, res) => {
    const sendResponse = (statusCode, headers) => res.writeHead(statusCode, headers);
    if (req.method !== 'GET') {
        sendResponse(405, {
            'Content-Type': 'text/plain'
        })
            .end('Only GET requests are allowed.');
        return;
    }
    switch (req.url) {
        case '/':
            sendResource('index.html', 'text/html');
            break;
        case '/resource':
            sendResource('assets/audio.mp3', 'application/octet-stream');
            break;
        default:
            sendResponse(404, {
                'Content-Type': 'text/plain'
            })
                .end('404 Not Found');
    }
    function sendResource(path, type) {
        path = (0, path_1.join)('client', ...path.split('/'));
        (0, fs_1.createReadStream)(path)
            .on('error', (err) => {
            if (err.code === 'ENOENT') {
                console.error('No such file exists.');
                return;
            }
            sendResponse(500, {
                'Content-Type': 'text/plain'
            })
                .end('Internal Server Error');
            console.error(err);
        })
            .on('open', () => sendResponse(200, {
            'Content-Type': type
        }))
            .pipe(res);
    }
});
server.listen(3000, () => console.log('The server is running on port', 3000));
