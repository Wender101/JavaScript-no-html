const gravity = 0.6

//document.querySelector('img').src = '../background/placeholder.png'
//const backgroundSpritePath = '/background/placeholder.png'
const backgroundSpritePath = 'https://rockcontent.com/br/wp-content/uploads/sites/2/2019/03/tamanho-imagem-blog-1024x538.png'

class Sprite {
    constructor({position, velocity,  dimensions, source}) {
        this.position = position
        this.velocity = velocity
        this.width = dimensions?.width
        this.height = dimensions?.height

        if(source) {
            this.image = new Image()
            this.image.src = source

            this.width = this.image.width
            this.height = this.image.height
        }
    }

    draw() {
        if(this.image) {
            context.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            )

        } else {
            context.fillStyle = 'white'
            context.fillRect(this.position.x, this.position.y, this.width, this.height)
        }

        if(this.isAttacking) {
            context.fillStyle = 'red'
            context.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }

    update() {
        this.draw()
    }
}

class Fighter extends Sprite {
    constructor({
        position, 
        velocity,
        dimensions
    }) {
        super({
            position,
            velocity,
            dimensions
        })

        this.velocity = velocity
        this.width = dimensions.width
        this.height = dimensions.height

        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 125,
            height: 50
        }

        this.isAttacking
        //? tmp para atacar dnv
        this.attackCooldown = 500
        this.onAttackCooldown

        //? Vai pegar a ultima tecla precionada
        this.lastKeyPressed

        //? Impedir que o player salte infinitamente
        this.onGround
    }

    update() {
        if(Math.ceil(this.position.y + this.height > canvas.height)) {
            this.onGround = true
        } else {
            this.onGround = false
        }

        if(this.position.y + this.height > canvas.height) {
            this.position.y = canvas.height - this.height
            this.velocity.y = 0
        } else {
            if(!this.onGround) this.velocity.y += gravity
        }

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.attackBox.position.x = this.position.x
        this.attackBox.position.y = this.position.y

        this.draw()
    }

    attack() {
        if(this.onAttackCooldown) return

        this.isAttacking = true
        //? Vai controlar o tmp para atacar novamente
        this.onAttackCooldown = true
        
        setTimeout(() => {
            this.isAttacking = false
        }, 100)

        //? Vai controlar o tmp para atacar novamente
        setTimeout(() => {
            this.onAttackCooldown = false
        }, this.attackCooldown)
    }

    jump() {
        if(this.onGround) {
            this.velocity.y -= 16
        }
    }
}

const player = new Fighter({
    position: {
        x: 100,
        y: 100
    },
    velocity: {
        x: 0,
        y: 10
    },
    dimensions: {
        width: 50,
        height: 150
    }
})

const player2 = new Fighter({
    position: {
        x: 600,
        y: 20
    },
    velocity: {
        x: 0,
        y: 10
    },
    dimensions: {
        width: 50,
        height: 200
    }
})

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    }, 
    source: backgroundSpritePath
})