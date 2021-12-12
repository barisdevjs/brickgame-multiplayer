export default class InputHandler {
    constructor(player) {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    player.moveLeft();
                    break;
                case 'ArrowRight': 
                    player.moveRight();
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