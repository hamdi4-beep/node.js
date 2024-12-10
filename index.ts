import { createReadStream } from "fs";
import { createServer, ServerResponse } from "http";
import { join } from "path";

connect(3000)

function connect(port: number) {
    let route

    return createServer((req, res) => {
        if (req.method !== 'GET') {
            sendResponse(res, 405).end('Only GET requests are allowed')
            return
        }

        if (req.url && (route = routes[req.url])) {
            const path = join('client', route)

            createReadStream(path)
                .on('error', (err: any) => {
                    if (err.code === 'ENOENT') {
                        sendResponse(res, 404).end('No such file exists.')
                        return
                    }

                    sendResponse(res, 500).end('Internal Server Error')
                    console.error(err)
                })
                .on('open', () => sendResponse(res, 200, {
                    'Content-Type': 'text/html'
                }))
                .pipe(res)
        } else {
            sendResponse(res, 404).end('No such route exists.')
        }
    })
    .listen(port, () => console.log('The server is running on port:', port))
}

const routes: {
    [key: string]: string
} = {
    '/': 'index.html',
    '/about': 'about.html'
}

const sendResponse = (
    res: ServerResponse,
    statusCode: number,
    headers?: {
        [key: string]: string
    }
) => {
    return res
        .writeHead(statusCode, headers || {
            'Content-Type': 'text/plain'
        })
}