export const Canvas = (id: string) => {
    const canvas = <HTMLCanvasElement> document.getElementById(id)
    const context = canvas.getContext('2d')
    
    return {
        getCanvas: () => canvas,
        getContext: () => context,
        clear: () => {
            context.clearRect(0, 0, canvas.width, canvas.height)
        },
        rectangle: (color: string) => (x: number) => (y: number) => (width: number) => (height: number) => {
            context.fillStyle = color
            context.fillRect(x-width/2, y-height/2, width, height)
        },
        circle: (color: string) => (x: number) => (y: number) => (radius: number)  => {
            context.beginPath()
            context.arc(x, y, radius, 0, 2 * Math.PI, false)
            context.fillStyle = color
            context.fill()
        }
    }
}


export const Color = (r: number) =>
                     (g: number) =>
                     (b: number) =>
                     (a: number) => `rgba(${r},${g},${b},${a.toFixed(2)})`
