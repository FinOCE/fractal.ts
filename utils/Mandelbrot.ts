import render, {Color, Coordinate} from './render'

export default async function Mandelbrot (width: number, height: number, iterations:number, [x, y]: Coordinate, zoom:number, [r, g, b]: Color) {
    await render('Mandelbrot', iterations, width, height, [x, y], zoom, (i, j) => {
        let real = i
        let imag = j

        let nt = iterations
        while (nt > 0) {
            let realt = real**2 - imag**2 + i
            imag = 2*real*imag + j
            real = realt
            nt--
            if (real * imag > 5) break
        }

        const color = 0xFF000000 + Math.round((iterations-nt)/iterations*r) + Math.round((iterations-nt)/iterations*g)*256 + Math.round((iterations-nt)/iterations*b)*256**2
        return (nt===0) ? 0xFF000000 : color
    })
}