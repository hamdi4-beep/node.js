import { createReadStream } from "fs";
import { join } from "path";
import { Transform } from "stream";

const filter = (regex: RegExp) => {
    return new Transform({
        defaultEncoding: 'utf-8',
        transform(chunk, enc, cb) {
            const data = chunk.toString()
            ;(data.split('\n') as string[]).forEach(forEachHandler.bind(this))
            cb()
        }
    })

    function forEachHandler(
        this: Transform,
        line: string
    ) {
        let match
    
        if (match = line.match(regex)) {
            const [_, heading] = match
            this.push(heading + '\n')
        }
    }
}

createReadStream(join('client', 'assets/style-guide.md'))
.on('error', (err: any) => {
    if (err.code === 'ENOENT') {
        console.log('No such file exists.')
        return
    }

    console.error(err)
})
.pipe(filter(/^#{3}\s([\S\s]+)/))
.pipe(process.stdout)