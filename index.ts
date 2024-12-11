import { createReadStream } from "fs";
import { createServer } from "http";
import { join } from "path";

const server = createServer((req, res) => {
    if (req.method !== 'GET') {
        res
            .writeHead(405, textPlainMMETYPE)
            .end('Only GET requests are allowed.')

        return
    }

    sendImage('client/assets/image.jpg')

    function sendImage(path: string) {
        path = join(...path.split('/'))

        createReadStream(path)
            .on('error', (err: any) => {
                if (err.code === 'ENOENT') {
                    res
                        .writeHead(404, textPlainMMETYPE)
                        .end('No such resource was found.')

                    return
                }

                console.error(err)

                res
                    .writeHead(500, textPlainMMETYPE)
                    .end('Internal Error')
            })
            .on('open', () => res.writeHead(200, {
                'Content-Type': 'image/jpeg'
            }))
            .pipe(res)
    }
})

server.listen(3000, () => console.log('The server is running on port 3000'))

const textPlainMMETYPE = {
    'Content-Type': 'text/plain'
}