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
            res
                .writeHead(405, {
                'Content-Type': 'text/plain'
            })
                .end('Only GET requests are allowed.');
        }
        if (req.url && (route = routes[req.url])) {
            (0, fs_1.createReadStream)((0, path_1.join)('client', route))
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
                .end('No such route exists.');
        }
    })
        .listen(port, () => console.log('The server is running on port:', port));
}
const routes = {
    '/': 'index.html'
};
