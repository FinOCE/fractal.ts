import fs from 'fs'
import {createCanvas} from 'canvas'
import moment from 'moment'

export type Coordinate = [number, number]
export type Color = [number, number, number]

export default async function render(s: string, n: number, w: number, h: number, [x, y]: Coordinate, z: number, callback: (i: number, j: number) => number): Promise<void> {
    return new Promise(resolve => {
        const canvas = createCanvas(w, h)
        const ctx = canvas.getContext('2d')

        const data = ctx.createImageData(w, h)
        const buff = new Uint32Array(data.data.buffer)

        n = Math.round(n*1e15)/1e15
        w = Math.round(w*1e15)/1e15
        h = Math.round(h*1e15)/1e15
        x = Math.round(x*1e15)/1e15
        y = Math.round(y*1e15)/1e15
        z = Math.round(z*1e15)/1e15

        let index = 0
        console.log(z, x, y)
        for (let j = y-h/z/2; j < y+h/z/2; j += 1/z) {
            for (let i = x-w/z/2; i < x+w/z/2; i += 1/z) {
                buff[index++] = callback(i, j)
            }
        }

        ctx.putImageData(data, 0, 0)

        const buffer = canvas.toBuffer('image/png')
        fs.writeFile(`./output/${moment().format('YYYY-MM-DD HH-mm-ss')} ${s} {${n}} [${w}x${h}] (${x},${y}i) ${z}x.png`, buffer, () => {
            console.log('File written')
            resolve()
        })
    })
}