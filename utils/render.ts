import fs from 'fs'
import {createCanvas} from 'canvas'

export type Coordinate = [number, number]

export default function render(s: string, n: number, [w, h]: Coordinate, x:number, y:number, z: number, callback: (i: number, j: number) => number) {
    const canvas = createCanvas(w, h)
    const ctx = canvas.getContext('2d')

    const data = ctx.createImageData(w, h)
    const buff = new Uint32Array(data.data.buffer)

    let index = 0
    for (let j = y-w/z/2; j < y+w/z/2; j += 1/z) {
        for (let i = x-h/z/2; i < x+h/z/2; i += 1/z) {
            buff[index++] = callback(i, j)
        }
    }

    ctx.putImageData(data, 0, 0)

    const buffer = canvas.toBuffer('image/png')
    fs.writeFile(`./output/${s} {${n}} [${w}x${h}] (${x},${y}i) ${z}x.png`, buffer, () => {
        console.log('File written')
    })
}