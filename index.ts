import { createReadStream } from "fs";
import { createServer } from "http";

connect(3000)

function connect(port: number) {
    const server = createServer()
    server.listen(port, 'localhost', () => console.log('The server is running on port:', port))

    server.on('request', (req, res) => {
        let path = ''
        req.setEncoding('utf-8')

        req
            .on('readable', () => {
                let chunk
                while ((chunk = req.read()) !== null) path += chunk
            })
            .on('end', () => {
                createReadStream(path)
                    .on('error', handleError)
                    .pipe(res)
            })

        function handleError(err: any) {
            if (err.code === 'ENOENT') {
                res.end('No such file exists.')
                return
            }

            console.error(err)
        }
    })

    return server
}