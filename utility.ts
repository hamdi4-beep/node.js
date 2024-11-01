import EventEmitter from 'events'
import fs from 'fs'

type Callback = (this: EventEmitter, data: string) => void

export function handleReadFile(path: string) {
    const emitter = new EventEmitter()

    return (cb: Callback) => {
        const bound = cb.bind(emitter)
        fs.readFile(path, 'utf-8', readFileCallback)

        function readFileCallback(err: NodeJS.ErrnoException | null, data: string) {
            if (err) {
                emitter.emit('error', err)
                process.exit(1)
            }

            bound(data)
        }

        return emitter
    }
}

export const convertToHyphenCase = (str: string) => str.split(' ').map(s => s.toLowerCase()).join('-')