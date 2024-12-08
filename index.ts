import { createReadStream } from "fs";
import { createServer } from "http";

connect(3000)

function connect(port: number) {
    const server = createServer()
    server.listen(port, 'localhost', () => console.log('The server is running on port:', port))

    server.on('request', (req, res) => {
        req.setEncoding('utf-8')

        req
            .on('readable', () => {
                let path

                while ((path = req.read()) !== null) {
                    createReadStream(path)
                        .pipe(res)
                        .on('error', handleError)
                }
            })

        function handleError(err: any) {
            if (err.code === 'ENOENT') {
                res.end('No such file exists.')
                return
            }

            console.error(err)
        }
    })
}