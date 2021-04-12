import fs from 'fs'
import {createCanvas} from 'canvas'

export type Coordinate = [number, number]

export default function render([w, h]: Coordinate, z: number, callback: (i: number, j: number) => number) {
    const canvas = createCanvas(w, h)
    const ctx = canvas.getContext('2d')

    const data = ctx.createImageData(w, h)
    const buff = new Uint32Array(data.data.buffer)

    let index = 0
    for (let i = 0-w/z/2; i < 0+w/z/2; i += 1/z) {
        for (let j = 0-h/z/2; j < 0+h/z/2; j += 1/z) {
            buff[index++] = callback(j, i)
        }
    }

    ctx.putImageData(data, 0, 0)

    const buffer = canvas.toBuffer('image/png')
    fs.writeFile('./output/test.png', buffer, () => {
        console.log('File written')
    })
}