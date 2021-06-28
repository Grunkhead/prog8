class Helipad {

    constructor(x, y) {
        this.x = x;
        this.y = y;

        let helipad = new Image()
        helipad.src = "images/helipad.png"
        this.helipad = helipad
    }

    update(ctx) {
        ctx.drawImage(this.helipad, this.x, this.y)
    }
    
  }