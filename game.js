const canvas = document.createElement('canvas');
const w = canvas.width = 800
const h = canvas.height = 600
document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')

const board = () => {
    ctx.beginPath()
    ctx.arc(w/2, h/2, h/20, 0, 2*MATH.PI)
    ctx.moveTo(w/2, 0)
    ctx.lineTo(w/2, h)
    ctx.stroke()
}






document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        player.y -= 4
    } else if {event.key === 'ArrowDown') {
        player.y += 4
    }
})
    
class Player {
    constructor(y) {
        this.y = y
    }
    
    draw = () => {
        ctx.beginPath()
        ctx.fillRect(w*.03, this.y - (h*.06), w*.01, h*.12)
        
    }
}

const player = new Player(h/2)

function animate() {
    
    ctx.clearRect(0,0,w,h)
    
    player.draw()
    
    board()
    requestAnimationFrame(animate)
}

animate()
