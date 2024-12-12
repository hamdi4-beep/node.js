"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtension = void 0;
exports.connect = connect;
const http_1 = require("http");
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
const getExtension = (filepath) => {
    var _a;
    filepath = filepath.split('/').pop();
    const extension = (_a = filepath.match(/.(\w+)$/)) === null || _a === void 0 ? void 0 : _a[1];
    if (!extension) {
        console.log('Make sure the file path contains extension.');
        return;
    }
    return mmeTypes[extension];
};
exports.getExtension = getExtension;
const mmeTypes = {
    'jpg': 'image/jpeg',
    'html': 'text/html',
    'text': 'text/plain'
};
