import { collisionDetector } from "./collision.js";

export default class Ball {
    constructor(game,walls) {
    this.ballImage = document.getElementById('ball');
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.position = {x: 10, y: 10};
    this.speed = {x:1, y:7}
    this.size = 15;
    this.game = game; // we can use game with other methods
}

draw(ctx) {
    ctx.drawImage(
        this.ballImage,
        this.position.x,
        this.position.y,
        this.size,
        this.size);
        // console.log(this.game.walls[0].position.y)
    }

    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y

            // check wall left or right
            if (  
                this.position.x + this.size > this.gameWidth ||
                this.position.x < 0 
                ) this.speed.x = -this.speed.x
    
                // check wall top or bottom
            if (
                this.position.y + this.size > this.gameHeight ||
                this.position.y < 0 
            )   this.speed.y = -this.speed.y

            

            // check collision with players
    
            const bottomOfBall = this.position.y + this.size;
            const topOfBall = this.position.y;
    
            // player
            const topOfPlayer = this.game.player.position.y;
            const leftOfPlayer = this.game.player.position.x;
            const rightOfPlayer = this.game.player.position.x +
             this.game.player.width;
            
            if (bottomOfBall >= topOfPlayer &&
                this.position.x >= leftOfPlayer &&
                this.position.x  + this.size <= rightOfPlayer) {
                this.speed.y = -this.speed.y;
                this.position.y = this.game.player.position.y - this.size;
            }
    
            const bottomOfPlayer2 = this.game.player2.position.y + this.size;
            const leftOfPlayer2 = this.game.player2.position.x;
            const rightOfPlayer2 = this.game.player2.position.x +
             this.game.player2.width;
            
            if (topOfBall <= bottomOfPlayer2 &&
                this.position.x >= leftOfPlayer2 &&
                this.position.x  + this.size <= rightOfPlayer2) {
                this.speed.y = -this.speed.y;
                this.position.y = this.game.player2.position.y + this.size;
            }

            // check collision with walls 
            // We will continueHEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE

            const topOfWalls = [
            this.game.walls[0].position,
            this.game.walls[1].position,
            this.game.walls[2].position,
            this.game.walls[3].position
        ]
/* 
            const xAxisOfWalls = [
            this.game.walls[0].position.x,
            this.game.walls[1].position.x,
            this.game.walls[2].position.x,
            this.game.walls[3].position.x
           ]   
*/
            if ( topOfWalls.some(e => e.position === this.position) )
            {
                this.speed.y = -this.speed.y;
            }  


    }   
}