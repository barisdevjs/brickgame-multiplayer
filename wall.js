export default class Wall {
    constructor(game, position) {
        this.wallImage = document.getElementById("wall");
        this.game = game;
        this.position = position;
        this.width = 70;
        this.height = 20;
    }

    update(deltaTime) {
    // maybe we don't need this
    }

    draw(ctx) {
        ctx.drawImage(
            this.wallImage,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }
    
}