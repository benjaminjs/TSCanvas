import { Canvas, Color } from "./Canvas";

const Paint = Canvas('mainCanvas')

const CanvasMouse = ((Paint) => {
    let mouse = {
      x: 0,
      y: 0,
      clicked: false
    }

    window.onmousemove = (e: MouseEvent) => {
        mouse.x = e.pageX - Paint.getCanvas().offsetLeft
        mouse.y = e.pageY - Paint.getCanvas().offsetTop
    }

    window.onmousedown = (e: MouseEvent) => mouse.clicked = true

    window.onmouseup =  (e: MouseEvent) => mouse.clicked = false

    return {
      getX: () => mouse.x,
      getY: () => mouse.y,
      isClicked: () => mouse.clicked,
    }
})(Paint)

const loop = (start: number = Date.now()) => (timestamp: number) => {

    const time = start - timestamp
    const timeUnits = time / 130
    const baseSize = 10

    const orbSizeMultiplier = CanvasMouse.isClicked() ? 10 : 5

    const color = CanvasMouse.isClicked() ? Color(236)(181)(181) : Color(255)(255)(255)

    const sizing = (val: number, multiply = 1) => (Math.cos(val)+1) * multiply

    const createOrb = (timeUnits: number) => (baseSize: number) => (size: number) => (delay: number) => (fade: number) => ({
        fade: sizing(timeUnits + delay) / fade,
        size: sizing(timeUnits + delay, size) + baseSize
    })

    const baseOrb = createOrb(timeUnits)(baseSize);

    const orbs = [
        baseOrb(1)(0)(1),
        baseOrb(orbSizeMultiplier*1)(6)(8),
        baseOrb(orbSizeMultiplier*2)(12)(12),
        baseOrb(orbSizeMultiplier*3)(24)(16)
    ]

    Paint.clear()

    orbs.forEach((orb) => Paint.circle(color(orb.fade))(CanvasMouse.getX())(CanvasMouse.getY())(orb.size))

    window.requestAnimationFrame(loop(start || timestamp))
}

window.requestAnimationFrame(loop(null))
