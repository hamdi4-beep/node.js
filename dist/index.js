"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const helpers_1 = require("./utilities/helpers");
const { readFile } = fs_1.promises;
(0, helpers_1.connect)(3000).on('request', (req, res) => {
    switch (req.url) {
        case '/':
            sendResource('index.html');
            break;
        case '/music':
            (0, fs_1.createReadStream)((0, path_1.join)('client', 'assets/audio.mp3'))
                .on('error', (err) => {
                if (err.code === 'ENOENT') {
                    console.log('No such file exists.');
                    return;
                }
                res
                    .writeHead(500, {
                    'Content-Type': 'text/plain'
                })
                    .end('Internal Server Error');
                console.error(err);
            })
                .on('open', () => res.writeHead(200, {
                'Content-Type': 'application/octet-stream',
                "access-control-allow-origin": '*'
            }))
                .pipe(res);
            break;
        default:
            // processes assets such as images, css, etc
            if ((0, fs_1.existsSync)((0, path_1.join)('client', req.url))) {
                sendResource(req.url);
                return;
            }
            res
                .writeHead(404, {
                'Content-Type': 'text/plain'
            })
                .end('404 Not Found');
    }
    function sendResource(filepath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield readFile((0, path_1.join)('client', filepath), 'utf-8');
                res
                    .writeHead(200, {
                    'Content-Type': (0, helpers_1.getMmeType)(filepath)
                })
                    .end(data);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
});
