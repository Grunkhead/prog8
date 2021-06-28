// Objects
let helicopter = new Helicopter(220, 50)
let helipad    = new Helipad(220, 420)

// Canvas context
let ctx = document.getElementById('myCanvas').getContext("2d")

// Set width and height for canvas
ctx.width  = 600
ctx.height = 500

const clearDrawings = () => { ctx.clearRect(0, 0, ctx.width, ctx.height) }

function keyPressed() {

    const logits = features.infer(video);
    if (key == 'a') {
        // Classify as left label
        knn.addExample(logits, 'left')

    } else if (key == 'd') {
        // Classify as right label
        knn.addExample(logits, 'right')

    } else if (key == 'w') {
        // Classify as up label
        knn.addExample(logits, 'up')

    } else if (key == 's') {
        // Classify as down label
        knn.addExample(logits, 'down')

    } else if (key == 'e') {
        // Classify as stop label
        knn.addExample(logits, 'stop')

    } else if (key == '/') {
        save(knn, 'pretrainedModel.json')
    }
}

function draw() {

    if (!helicopter.landed()) {
        clearDrawings()
        helipad.update(ctx)
        helicopter.update(ctx)
    }

    if (helicopter.landed()) {
        document.getElementById('message').style.display = 'block'
        return
    }

    if (label == 'left') {
        helicopter.x -= helicopter.speed;
    }

    if (label == 'right') {
        helicopter.x += helicopter.speed;
    }

    if (label == 'up') {
        helicopter.y -= helicopter.speed;
    }

    if (label == 'down') {
        helicopter.y += helicopter.speed;
    }

    if (!usePretrainedModel && knn.getNumLabels() > 0) {
        classify();
    }
}