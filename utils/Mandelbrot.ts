import render from './render'

export default class Mandelbrot {
    public width: number
    public height: number
    public iterations: number
    public zoom: number

    constructor(w: number, h: number, n:number, x: number, y: number, z:number) {
        this.width = w
        this.height = h
        this.iterations = n
        this.zoom = z

        render('Mandelbrot', n, [w, h], x, y, z, (i, j) => {
            let real = i
            let imag = j

            let nt = n
            while (nt > 0) {
                let realt = real**2 - imag**2 + i
                imag = 2*real*imag + j
                real = realt
                nt--
                if (real * imag > 5) break
            }

            return (nt===0) ? 0xFF000000 : 0xFF000000 + (n-nt)/n*255 // 255 = red, 16777215 = all colours
        })
    }
}