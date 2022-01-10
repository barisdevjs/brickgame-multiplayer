export default class InputHandler {
    constructor(player,game) {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    player.moveLeft();
                    break;
                case 'ArrowRight': 
                    player.moveRight();
                    break;
                case 'Escape':
                    game.togglePause();
                    break;
                case ' ':
                    game.start()
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    if (player.speed < 0) 
                    player.stop();
                    break;
                    
                case 'ArrowRight': 
                    if (player.speed > 0)
                    player.stop();
                    break;
            }
        });
    }
}