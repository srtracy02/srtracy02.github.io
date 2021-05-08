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

window.addEventListener('mousemove', (e) => {
    player.x = e.x - window.innerWidth/2 + w/2
    player.y = e.y - h*.05
})

class Player {
    constructor () {
        this.x = undefined
        this.y = undefined
    }
    
    draw () {
        ctx.beginPath()
        ctx.arc(this.x, this.y, w*.05, 0, 2*Math.PI)
        ctx.fillStyle = "red"
        ctx.fill()
        ctx.stroke()
    }
}

const player = new Player

function animate() {
    ctx.clearRect(0, 0, w, h)
    
    board()
    
    player.draw()
    
    requestAnimationFrame(animate)
}

animate()
