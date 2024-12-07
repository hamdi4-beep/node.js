import { createReadStream } from "fs";
import { createServer } from "http";

connect(3000)

function connect(port: number) {
    const server = createServer()
    server.listen(port, 'localhost', () => console.log('The server is up and running'))

    server.on('request', (req, res) => {
        createReadStream('package.json')
            .on('data', chunk => res.write(chunk))
            .on('end', () => res.end())
    })
}