import render from './render'

export default class Mandelbrot {
    public width: number
    public height: number
    public iterations: number
    public zoom: number

    constructor(w: number, h: number, n:number, z:number, c:boolean = false) {
        this.width = w
        this.height = h
        this.iterations = n
        this.zoom = z

        render([w, h], z, (i, j) => {
            let real = i
            let imag = j

            let nt = n
            while ((c) ? (i**2 + j**2 <= 4 && nt > 0) : (nt > 0)) {
                let xt = real**2 - imag**2 + i
                imag = 2*real*imag + j
                real = xt
                nt--
                if (real * imag > 5) break
            }

            //if (0xFF000000 + (nt-n)/nt*16777215 !== 0xFF000000) console.log(n, nt, (n-nt)/n)
            //return (isNaN(0xFF000000 + (nt-n)/nt*16777215)) ? 0xFFFFFFFF : 0xFF000000
            //return 0xFF000000
            return (nt===0) ? 0xFF000000 : 0xFF000000 + (n-nt)/n*16777215
            //return (nt > 0) ? 0xFFFFFFFF : 0xFF000000
        })
    }
}