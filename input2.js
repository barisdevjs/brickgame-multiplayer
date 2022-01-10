export default class InputHandler2 {
    constructor(player2) {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'a' || 'A':
                    player2.moveLeft();
                    break;
                case 'd' || 'D': 
                    player2.moveRight();
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'a':
                    if (player2.speed < 0) 
                    player2.stop();
                    break;
                    
                case 'd': 
                    if (player2.speed > 0)
                    player2.stop();
                    break;
            }
        });
    }
}