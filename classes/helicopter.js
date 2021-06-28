class Helicopter {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 1

        let helicopter = new Image()
        helicopter.src = "images/helicopter.png"
        this.helicopter = helicopter
    }

    update(ctx) {
        ctx.drawImage(this.helicopter, this.x, this.y)
    }

    landed() {

        if (this.x > 219 && 
            this.x < 219 + 64 &&
            this.y > 420 && 
            this.y < 420 + 64) {
    
            return true
        }
    
        return false
    }
    
  }