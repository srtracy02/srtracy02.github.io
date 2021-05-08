const canvas = document.createElement('canvas')
const w = canvas.width = 500
const h = canvas.height = 700
document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')

const board = () => {
    ctx.beginPath()
    ctx.arc(w/2, h/2, w/10, 0, 2*Math.PI)
    ctx.moveTo(0, h/2)
    ctx.lineTo(w, h/2)
    ctx.stroke()
}

function animate() {
    board()
    requestAnimationFrame(animate)
}

animate()
