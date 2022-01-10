import Player from './player.js';
import InputHandler from './input.js';
import Ball from './ball.js';
import {buildLevel,levelOne,levelTwo} from './levels.js';
import InputHandler2 from './input2.js';

const gameState = {
    paused : 0,
    running : 1,
    menu : 2,
    gameOver : 3,
    newLevel : 4,
    winner : 5
}

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.ball = new Ball(this)
        this.player = new Player(this, 'blue');
        new InputHandler(this.player,this); // this refers to the game controls
        this.walls = buildLevel(this, levelOne);
        this.player2 = new Player(this, 'green');
        this.player2.position.x = this.gameWidth / 2 - this.player.width / 2;
        this.player2.position.y = 10;
        new InputHandler2(this.player2,this);
        this.gameState = gameState.menu;
        this.gameOver = document.getElementById('gameOver');

    }

    start() {
        this.gameState = gameState.running;
         // this refers to the game object
        this.gameObjects = [this.ball, this.player, this.player2,...this.walls];
    }

    update(deltaTime) {
            if (
                this.gameState === gameState.paused ||
                this.gameState === gameState.menu ||
                this.gameState === gameState.gameOver ||
                this.gameState === gameState.winner
                )
            return;

            if ( this.ball.scoreElements.some(element => Number(element.innerHTML) > 4 )) {
                this.gameState = gameState.newLevel;
                this.gameState = gameState.running;
                this.start();
                this.ball.levelElement.innerHTML = 2;
                this.walls = buildLevel(this, levelTwo);
            }

            this.gameObjects.forEach(object => object.update(deltaTime));

    }

    draw(ctx) {
        this.player.draw(ctx, this.player.color);
        this.player2.draw(ctx, this.player2.color);
        this.ball.draw(ctx);
        this.walls.forEach(wall => wall.draw(ctx));

        if ( this.gameState === gameState.running ) { // pausing game
            ctx.rect(30,350,this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(155,0,220,0.1)";
            ctx.fill();
            ctx.font = "25px Sans-Serif";
            ctx.fillStyle = "#47434F";
            ctx.textAlign = "left";
            ctx.fillText("Esc to Pause", 0, 20);
        }

        if ( this.gameState === gameState.paused ) { // unpausing game
            ctx.rect(0,0,this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();
            ctx.font = "60px Sans-Serif";
            ctx.fillStyle = "Black";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2);
        }

        if ( this.gameState === gameState.menu ) { // starting the game
            ctx.rect(0,0,this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.9)";
            ctx.fill();
            ctx.font = "60px Sans-Serif";
            ctx.fillStyle = "Black";
            ctx.textAlign = "center";
            ctx.fillText("Press SpaceBar  To Start", this.gameWidth/2, this.gameHeight/2 + 30);
            ctx.font = "40px Sans-Serif";
            ctx.fillStyle = "purple";
            ctx.textAlign = "center";
            ctx.fillText("PlayerOne  Controls <= =>", this.gameWidth/2, this.gameHeight - 100);
            ctx.fillText("PlayerTwo  Controls A   D", this.gameWidth/2, 100);


        }

        if ( this.gameState === gameState.gameOver ) { 

            ctx.drawImage(this.gameOver, 0, 0, this.gameWidth, this.gameHeight);              

        }

        if ( this.ball.scoreElements.some(element => Number(element.innerHTML) > 9 )) {
            const text = Number(this.ball.scoreElements[0].innerHTML) >
            Number(this.ball.scoreElements[1].innerHTML) ?
            this.ball.player1scoreElementAttr :
            this.ball.player2scoreElementAttr;

            this.gameState = gameState.winner;
            ctx.rect(0,0,this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.9)";
            ctx.fill();
            ctx.font = "100px Sans-Serif";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText(`${text}`, this.gameWidth/2, this.gameHeight/2 + 70);

            setTimeout(() => {
                ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
                this.gameState = gameState.gameOver;
                ctx.drawImage(this.gameOver, 0, 0, this.gameWidth, this.gameHeight); 
            }, 2000).then(() =>

            clearTimeout(() => {
                ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
                this.gameState = gameState.gameOver;
                ctx.drawImage(this.gameOver, 0, 0, this.gameWidth, this.gameHeight); 
            },2000))
        }

    }
     
    togglePause() {
        if (this.gameState === gameState.running) {
            this.gameState = gameState.paused;
        } else {
            this.gameState = gameState.running;
        }
    }


}

