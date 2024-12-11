import { createReadStream } from "fs";
import { createServer } from "http";
import { join } from "path";

const server = createServer((req, res) => {
    if (req.method !== 'GET') {
        res
            .writeHead(405, {
                'Content-Type': 'text/plain'
            })
            .end('Only GET requests are allowed.')

        return
    }

    switch (req.url) {
        case '/':
            sendResource('index.html')
            break

        case '/about':
            sendResource('about.html')
            break

        case '/resource':
            sendResource('assets/image.jpg')
            break;

        default:
            res
                .writeHead(404, {
                    'Content-Type': 'text/plain'
                })
                .end('Not Found')
    }

    function sendResource(path: string) {
        const extension = getExtension(path)!
        path = join('client', ...path.split('/'))

        createReadStream(path)
            .on('error', (err: any) => {
                if (err.code === 'ENOENT') {
                    res
                        .writeHead(404, {
                            'Content-Type': 'text/plain'
                        })
                        .end('No such resource was found.')

                    return
                }

                console.error(err)

                res
                    .writeHead(500, {
                        'Content-Type': 'text/plain'
                    })
                    .end('Internal Server Error')
            })
            .on('open', () => res.writeHead(200, {
                'Content-Type': mmeType[extension]
            }))
            .pipe(res)
    }
})

server.listen(3000, () => console.log('The server is running on port 3000'))

const getExtension = (filepath: string) => {
    const filename = filepath.split('/').pop()
    return filename?.match(/.(\w+)$/)?.[1]
}

const mmeType = {
    'jpg': 'image/jpeg',
    'html': 'text/html'
} as {
    [key: string]: string
}