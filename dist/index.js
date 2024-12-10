"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const http_1 = require("http");
const path_1 = require("path");
connect(3000);
function connect(port) {
    let route;
    return (0, http_1.createServer)((req, res) => {
        if (req.method !== 'GET') {
            sendResponse(res, 405).end('Only GET requests are allowed');
            return;
        }
        if (req.url && (route = routes[req.url])) {
            const path = (0, path_1.join)('client', route);
            (0, fs_1.createReadStream)(path)
                .on('open', () => sendResponse(res, 200, {
                'Content-Type': 'text/html'
            }))
                .on('error', (err) => {
                if (err.code === 'ENOENT') {
                    sendResponse(res, 405).end('No such file exists');
                    return;
                }
                console.error(err);
            })
                .pipe(res);
        }
        else {
            sendResponse(res, 404).end('No such route exists.');
        }
    })
        .listen(port, () => console.log('The server is running on port:', port));
}
const routes = {
    '/': 'index.html',
    '/about': 'about.html'
};
const sendResponse = (res, statusCode, headers) => {
    return res
        .writeHead(statusCode, headers || {
        'Content-Type': 'text/plain'
    });
};
