import { createReadStream } from "fs";
import { createServer } from "http";
import { join } from "path";

const server = createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            
        if (req.url && routes[req.url]) {
            createReadStream(join('client', routes[req.url]))
                .on('open', () => res.writeHead(200, {
                    'Content-Type': 'text/html'
                }))
                .pipe(res)
        } else {
            res
                .writeHead(404, {
                    'Content-Type': 'text/plain'
                })
                .end('Not Found')
        }
    }
})

server.listen(3000)

const routes: {
    [key: string]: string
} = {
    '/': 'index.html',
    '/user': 'user.html'
}