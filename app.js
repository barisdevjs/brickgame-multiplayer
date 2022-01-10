import Game from "./game.js";

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const gameWidth = canvas.width;
const gameHeight = canvas.height;




let game = new Game(gameWidth, gameHeight);

let lastTime = 0;

function gameLoop(timeStamp){
let deltaTime = timeStamp - lastTime;
lastTime = timeStamp;
ctx.clearRect(0, 0, gameWidth, gameHeight);
game.update(deltaTime);
game.draw(ctx);

requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
