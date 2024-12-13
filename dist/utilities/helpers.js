"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMmeType = void 0;
exports.connect = connect;
const http_1 = require("http");
const mmeTypes = {
    'html': 'text/html',
    'css': 'text/css'
};
const getMmeType = (path) => {
    const filename = path.split('/').pop();
    const matches = filename.match(/\.(\w+)$/);
    if (!matches) {
        console.log('No match was found.');
        return;
    }
    return mmeTypes[matches[1]];
};
exports.getMmeType = getMmeType;
function connect(port) {
    const server = (0, http_1.createServer)((req, res) => {
        if (req.method !== 'GET') {
            res
                .writeHead(405, {
                'Content-Type': 'text/plain'
            })
                .end('Only GET requests are allowed.');
            return;
        }
    });
    return server.listen(port, () => console.log('The server is running on port', port));
}
