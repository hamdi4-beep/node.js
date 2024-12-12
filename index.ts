import { createReadStream } from "fs";
import { createServer } from "http";
import { join } from "path";

const server = createServer((req, res) => {
    const sendResponse = (
        statusCode: number,
        headers: {
            [key: string]: string
        }
    ) => res.writeHead(statusCode, headers)

    if (req.method !== 'GET') {
        sendResponse(405, {
            'Content-Type': 'text/plain'
        })
            .end('Only GET requests are allowed.')

        return
    }

    switch (req.url) {
        case '/':
            sendResource('index.html', 'text/html')
            break

        case '/resource':
            sendResource('assets/audio.mp3', 'application/octet-stream')
            break

        default:
            sendResponse(404, {
                'Content-Type': 'text/plain'
            })
                .end('404 Not Found')
    }


    function sendResource(
        path: string,
        type: string
    ) {
        path = join('client', ...path.split('/'))

        createReadStream(path)
            .on('error', (err: any) => {
                if (err.code === 'ENOENT') {
                    console.error('No such file exists.')
                    return
                }

                sendResponse(500, {
                    'Content-Type': 'text/plain'
                })
                    .end('Internal Server Error')

                console.error(err)
            })
            .on('open', () => sendResponse(200, {
                'Content-Type': type
            }))
            .pipe(res)
    }
    
})

server.listen(3000, () => console.log('The server is running on port', 3000))