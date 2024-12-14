"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const stream_1 = require("stream");
const filter = (regex) => {
    return new stream_1.Transform({
        defaultEncoding: 'utf-8',
        transform(chunk, enc, cb) {
            const data = chunk.toString();
            data.split('\n').forEach(forEachHandler.bind(this));
            cb();
        }
    });
    function forEachHandler(line) {
        let match;
        if (match = line.match(regex)) {
            const [_, heading] = match;
            this.push(heading + '\n');
        }
    }
};
(0, fs_1.createReadStream)((0, path_1.join)('client', 'assets/style-guide.md'))
    .on('error', (err) => {
    if (err.code === 'ENOENT') {
        console.log('No such file exists.');
        return;
    }
    console.error(err);
})
    .pipe(filter(/^#{3}\s?([\S\s]+)/))
    .pipe(process.stdout);
