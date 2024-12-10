import { createReadStream } from "fs";
import { createServer } from "http";
import { join } from "path";

connect(3000)

function connect(port: number) {
    let route

    return createServer((req, res) => {
        if (req.method !== 'GET') {
            res
                .writeHead(405, {
                    'Content-Type': 'text/plain'
                })
                .end('Only GET requests are allowed.')
        }

        if (req.url && (route = routes[req.url])) {
            createReadStream(join('client', route))
                .on('open', () => res.writeHead(200, {
                    'Content-Type': 'text/html'
                }))
                .pipe(res)
        } else {
            res
                .writeHead(404, {
                    'Content-Type': 'text/plain'
                })
                .end('No such route exists.')
        }
    })
    .listen(port, () => console.log('The server is running on port:', port))
}

const routes: {
    [key: string]: string
} = {
    '/': 'index.html'
}