import { createServer } from "http"

const mmeTypes = {
    'html': 'text/html',
    'css': 'text/css'
} as {
    [key: string]: string
}

export const getMmeType = (path: string) => {
    const filename = path.split('/').pop()!
    const matches = filename.match(/\.(\w+)$/)

    if (!matches) {
        console.log('No match was found.')
        return
    }

    return mmeTypes[matches[1]]
}

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