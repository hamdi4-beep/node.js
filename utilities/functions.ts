import { createServer } from "http"

export function connect(port: number) {
    const server = createServer((req, res) => {
        if (req.method !== 'GET') {
            res
                .writeHead(405, {
                    'Content-Type': 'text/plain'
                })
                .end('Only GET requests are allowed.')
    
            return
        }
    })
    
    return server.listen(port, () => console.log('The server is running on port', port))
}

export const getExtension = (filepath: string) => {
    filepath = filepath.split('/').pop()!
    const extension = filepath.match(/.(\w+)$/)?.[1]

    if (!extension) {
        console.log('Make sure the file path contains extension.')
        return
    }

    return mmeTypes[extension]
}

const mmeTypes = {
    'jpg': 'image/jpeg',
    'html': 'text/html',
    'text': 'text/plain'
} as {
    [key: string]: string
}