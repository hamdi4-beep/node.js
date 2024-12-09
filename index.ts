import { createReadStream, createWriteStream } from "fs";
import { createServer } from "http";

const PORT = process.env.PORT

const connect = (port: number) => createServer().listen(port, () => console.log('The server is running on port:', port))

connect(3000).on('request', (req, res) => {
    req.on('data', chunk => {
        createReadStream(chunk)
            .on('error', handleError)
            .pipe(res)
    })
})

function handleError(err: any) {
    if (err.code === 'ENOENT') {
        console.log('No such file exists.')
        return
    }

    console.error('Error Log:', err)
}