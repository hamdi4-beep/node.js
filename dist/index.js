"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const http_1 = require("http");
const path_1 = require("path");
const server = (0, http_1.createServer)((req, res) => {
    if (req.method !== 'GET') {
        res
            .writeHead(405, {
            'Content-Type': 'text/plain'
        })
            .end('Only GET requests are allowed.');
        return;
    }
    switch (req.url) {
        case '/':
            sendResource('index.html');
            break;
        case '/about':
            sendResource('about.html');
            break;
        case '/resource':
            sendResource('assets/image.jpg');
            break;
        default:
            res
                .writeHead(404, {
                'Content-Type': 'text/plain'
            })
                .end('Not Found');
    }
    function sendResource(path) {
        const extension = getExtension(path);
        path = (0, path_1.join)('client', ...path.split('/'));
        (0, fs_1.createReadStream)(path)
            .on('error', (err) => {
            if (err.code === 'ENOENT') {
                res
                    .writeHead(404, {
                    'Content-Type': 'text/plain'
                })
                    .end('No such resource was found.');
                return;
            }
            console.error(err);
            res
                .writeHead(500, {
                'Content-Type': 'text/plain'
            })
                .end('Internal Server Error');
        })
            .on('open', () => res.writeHead(200, {
            'Content-Type': mmeType[extension]
        }))
            .pipe(res);
    }
});
server.listen(3000, () => console.log('The server is running on port 3000'));
const getExtension = (filepath) => {
    var _a;
    const filename = filepath.split('/').pop();
    return (_a = filename === null || filename === void 0 ? void 0 : filename.match(/.(\w+)$/)) === null || _a === void 0 ? void 0 : _a[1];
};
const mmeType = {
    'jpg': 'image/jpeg',
    'html': 'text/html'
};
