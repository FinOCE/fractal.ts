import render from './render'

export default class Mandelbrot {
    constructor(w: number, h: number, z:number) {
        render([w, h], z, (i, j) => {
            return ((i/z + j/z) % 2 === 0) ? 0xFFFFFFFF : 0xFF000000
        })
    }
}