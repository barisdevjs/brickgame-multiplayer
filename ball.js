
export default class Ball {
    constructor(game) {
    this.ballImage = document.getElementById('ball');
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.position = {x: 10, y: 10};
    this.speed = {x:1, y:7}
    this.size = 16;
    this.game = game; // we can use game with other methods
    this.player1scoreElement = document.getElementById('player1-score');
    this.player2scoreElement = document.getElementById('player2-score');
    this.player1scoreElementAttr = this.player1scoreElement.getAttribute('data-player');
    this.player2scoreElementAttr = this.player2scoreElement.getAttribute('data-player');
    this.scoreElements = [this.player1scoreElement, this.player2scoreElement];
    this.levelElement = document.getElementById('level');
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
            if ( this.position.y + this.size > this.gameHeight ) 
                {  this.speed.y = -this.speed.y
                    this.player2scoreElement.innerHTML =
                    Number(this.player2scoreElement.innerHTML) + 1
                }

            if ( this.position.y < 0 ) {
                this.speed.y = -this.speed.y
                this.player1scoreElement.innerHTML =
                Number(this.player1scoreElement.innerHTML) + 1
            }
            


            // check collision with players
    
            const bottomOfBall = this.position.y + this.size;
            const topOfBall = this.position.y;
    
            // player
            const topOfPlayer = this.game.player.position.y;
            const leftOfPlayer = this.game.player.position.x;
            const rightOfPlayer = this.game.player.position.x +
             this.game.player.width;
            
            if (bottomOfBall >= topOfPlayer &&
                this.position.x + this.size/2 >= leftOfPlayer &&
                this.position.x  + this.size/2 <= rightOfPlayer) {
                this.speed.y = -this.speed.y;
                this.position.y = this.game.player.position.y - this.size;
            }
    
            const bottomOfPlayer2 = this.game.player2.position.y + this.size;
            const leftOfPlayer2 = this.game.player2.position.x;
            const rightOfPlayer2 = this.game.player2.position.x +
             this.game.player2.width;
            
            if (topOfBall <= bottomOfPlayer2 &&
                this.position.x  + this.size/2 >= leftOfPlayer2 &&
                this.position.x  + this.size/2 <= rightOfPlayer2) {
                this.speed.y = -this.speed.y;
                this.position.y = this.game.player2.position.y + this.size;
            }
             
            // check collision with rocks
            for (let i = 0; i < this.game.walls.length; i++) {
                const wall = this.game.walls[i];
                const wallTop = wall.position.y;
                const wallBottom = wall.position.y + wall.height;
                const wallLeft = wall.position.x;
                const wallRight = wall.position.x + wall.width;

                if (
                    bottomOfBall >= wallTop &&
                    this.position.x >= wallLeft  - this.size *.25 &&
                    this.position.x  + this.size * .75 <= wallRight &&
                    this.position.y < wallTop
                ) {
                    this.speed.y = -this.speed.y;
                    this.position.y = wallTop - this.size ;
                }    
               
                if (
                    topOfBall <= wallBottom &&
                    this.position.x + this.size * .25 >= wallLeft &&
                    this.position.x  + this.size * .75 <= wallRight &&
                    this.position.y + this.size/2 > wallBottom
                ) {
                    this.speed.y = -this.speed.y;
                    this.position.y = wallBottom + this.size ;
                } 
            }  

    }   
}
