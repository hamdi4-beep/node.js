"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const http_1 = require("http");
const path_1 = require("path");
const server = (0, http_1.createServer)((req, res) => {
    switch (req.method) {
        case 'GET':
            if (req.url && routes[req.url]) {
                (0, fs_1.createReadStream)((0, path_1.join)('client', routes[req.url]))
                    .on('open', () => res.writeHead(200, {
                    'Content-Type': 'text/html'
                }))
                    .pipe(res);
            }
            else {
                res
                    .writeHead(404, {
                    'Content-Type': 'text/plain'
                })
                    .end('Not Found');
            }
    }
});
server.listen(3000);
const routes = {
    '/': 'index.html',
    '/user': 'user.html'
};
