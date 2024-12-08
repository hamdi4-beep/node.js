"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const http_1 = require("http");
connect(3000);
function connect(port) {
    const server = (0, http_1.createServer)();
    server.listen(port, 'localhost', () => console.log('The server is running on port:', port));
    server.on('request', (req, res) => {
        req.setEncoding('utf-8');
        req
            .on('readable', () => {
            let path;
            while ((path = req.read()) !== null) {
                (0, fs_1.createReadStream)(path)
                    .on('error', (err) => {
                    if (err.code === 'ENOENT') {
                        res.end('No such file exists.');
                        return;
                    }
                    console.error(err);
                })
                    .pipe(res);
            }
        });
    });
}
