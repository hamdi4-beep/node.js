import { createReadStream, existsSync, promises as fsPromises } from "fs";
import { join } from "path";
import { getMmeType, connect } from "./utilities/helpers";

const { readFile } = fsPromises

connect(3000).on('request', (req, res) => {
    switch (req.url) {
        case '/':
            sendResource('index.html')
            break

        case '/music':
            createReadStream(join('client', 'assets/audio.mp3'))
                .on('error', (err: any) => {
                    if (err.code === 'ENOENT') {
                        console.log('No such file exists.')
                        return
                    }

                    res
                        .writeHead(500, {
                            'Content-Type': 'text/plain'
                        })
                        .end('Internal Server Error')

                    console.error(err)
                })
                .on('open', () => res.writeHead(200, {
                    'Content-Type': 'application/octet-stream'
                }))
                .pipe(res)

            break

        default:
            // processes assets such as images, css, etc
            
            if (existsSync(join('client', req.url!))) {
                sendResource(req.url!)
                return
            }

            res
                .writeHead(404, {
                    'Content-Type': 'text/plain'
                })
                .end('404 Not Found')
    }

    async function sendResource(filepath: string) {
        try {
            const data = await readFile(join('client', filepath), 'utf-8')

            res
                .writeHead(200, {
                    'Content-Type': getMmeType(filepath)
                })
                .end(data)
        } catch (e: any) {
            console.error(e)
        }
    }
})