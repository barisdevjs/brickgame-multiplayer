import Wall from "./wall.js";

export  function buildLevel(game, level) {
  let walls = [];
   
  level.forEach((row,rowIndex) => {
      row.forEach((wall,wallIndex) => {
            if(wall === 1) {
                const position = {
                    x: 100 * wallIndex,
                    y: 200 + 20 * rowIndex
                }
                walls.push(new Wall(game, position));
            }
      })
  })
  return walls;
}



export const levelOne = [
 [1, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 1],
 [0, 0, 0, 0, 1, 0, 0],
 [0, 0, 1, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0]
]

export const levelTwo = [
 [0, 0, 1, 0, 0, 0, 1],
 [1, 0, 0, 0, 0, 0, 0],
 [1, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 1, 0, 0, 1],
 [1, 1, 0, 0, 1, 0, 0]
]
