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
    const [_, extension] = filename === null || filename === void 0 ? void 0 : filename.match(/\.(\w+)$/);
    if (!extension) {
        console.log('The file name does not have an extension.');
        return;
    }
    return mmeTypes[extension];
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
