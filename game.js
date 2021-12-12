import Player from './player.js';
import InputHandler from './input.js';
import Ball from './ball.js';
import {buildLevel,levelOne,levelTwo} from './levels.js';

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.ball = new Ball(this)
        this.player = new Player(this, 'blue');
        new InputHandler(this.player);
        this.walls = buildLevel(this, levelOne);
        this.player2 = new Player(this, 'green');
        new InputHandler(this.player2);

    }

    start() {
        this.player2.position.x = this.gameWidth / 2 - this.player.width / 2;
        this.player2.position.y = 10;
         // this refers to the game object


        this.gameObjects = [this.ball, this.player, this.player2,...this.walls];


    }

    update(deltaTime) {
            this.gameObjects.forEach(object => object.update(deltaTime));

    }

    draw(ctx) {
        this.player.draw(ctx, this.player.color);
        this.player2.draw(ctx, this.player2.color);
        this.ball.draw(ctx);
        this.walls.forEach(wall => wall.draw(ctx));
    }


}

