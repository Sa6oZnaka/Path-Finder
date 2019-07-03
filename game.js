import {config} from "./config.js";
import {Point} from "./Point.js";
import {GameMap} from "./GameMap.js";

let start = new Point(7, 14);
let end  = new Point(0, 1);

let gameConfig = {
    width: 1400,
    height: 600,
    type: Phaser.AUTO,
    scene: {
        create: create
    }
};

let game = new Phaser.Game(gameConfig);

function create () {

    // create test array
    let array = [];
    for (let i = 0; i < config.MAP_SIZE_X; ++i) {
        array[i] = [];
        for (let j = 0; j < config.MAP_SIZE_Y; ++j) {
            array[i][j] = 0;
        }
    }

    array[0][2] = -1;
    array[2][0] = -1;

    let matrix = findRoute(array, start, end);
    let solutionMatrix = showRoute(matrix.getAllPrevious(), start, end);

    matrix = matrix.getAllExplored();

    let graphics = this.add.graphics({ fillStyle: { color: 0x0000ff }, lineStyle: { color: 0x0000aa } });

    let text = this.add.text(0, 0, '', { font: '15px Courier', fill: '#0f0' });
    let solutionText = this.add.text(700, 0, 'frefre', { font: '15px Courier', fill: '#ff0' });

    redraw();

    function redraw () {
        graphics.clear();

        for(let x = 0; x < config.MAP_SIZE_X; x++) {
            for(let y = 0; y < config.MAP_SIZE_Y; y++) {
                //matrix = Phaser.Utils.Array.Matrix.ReverseRows(matrix);
                //text.setText(Phaser.Utils.Array.Matrix.MatrixToString(matrix));

                solutionMatrix = Phaser.Utils.Array.Matrix.ReverseRows(solutionMatrix);
                solutionText.setText(Phaser.Utils.Array.Matrix.MatrixToString(solutionMatrix));
            }
        }
    }
}

//------------------------------------------------------------------------
// FUNCTION: findRoute
// calculates the shortest route
// PARAMETERS:
// array - 2D array (game map)
// start - start cordinates - example - ( new Point(x, y) )
// end   - end   cordinates - example - ( new Point(x, y) )
//------------------------------------------------------------------------

function findRoute(array, start, end){

    let tries = 0;
    let bfsArr = new GameMap(config.MAP_SIZE_X, config.MAP_SIZE_Y, array);

    bfsArr.setExplored(start.getX(), start.getY());

    while (! bfsArr.getFieldValue(end.getX(), end.getY())) {
        for (let i = 0; i < config.MAP_SIZE_X; i++) {
            for (let j = 0; j < config.MAP_SIZE_Y; j++) {
                if(bfsArr.getFieldValue(i, j) === true){

                    let currentPoint = new Point(i, j);

                    if(i > 0 && ! bfsArr.getFieldValue(i - 1, j)){
                        bfsArr.setExplored(i - 1, j);
                        bfsArr.setPrev(i - 1, j, currentPoint);
                    }
                    else if(i + 1 < config.MAP_SIZE_X && ! bfsArr.getFieldValue(i + 1, j)){
                        bfsArr.setExplored(i + 1, j);
                        bfsArr.setPrev(i + 1, j, currentPoint);
                    }
                    else if(j > 0 && ! bfsArr.getFieldValue(i, j - 1)){
                        bfsArr.setExplored(i, j - 1);
                        bfsArr.setPrev(i, j - 1, currentPoint);
                    }
                    else if(j + 1 < config.MAP_SIZE_Y && ! bfsArr.getFieldValue(i, j + 1)){
                        bfsArr.setExplored(i, j + 1);
                        bfsArr.setPrev(i, j + 1, currentPoint);
                    }
                }
            }
        }
        tries ++;
        if(tries > config.MAP_SIZE_X * config.MAP_SIZE_Y){
            throw "No route found!";
        }
    }

    console.log(JSON.stringify(bfsArr.getAllPrevious()));
    console.log(JSON.stringify(bfsArr.getAllExplored()));
    console.log("tries: " + tries);

    return bfsArr;
}

//------------------------------------------------------------------------
// FUNCTION: findRoute
// shows the route using prevArr
// PARAMETERS:
// prevArr - using the instance of GameMap call GameMap::getAllPrevious
// start   - start cordinates - example - ( new Point(x, y) )
// end     - end   cordinates - example - ( new Point(x, y) )
//------------------------------------------------------------------------

function showRoute(prevArr, start, end) {

    if(prevArr[end.getX()][end.getY()] === null){
        throw "The maze isn't solved!";
    }

    let array = [];
    for (let i = 0; i < config.MAP_SIZE_X; ++i) {
        array[i] = [];
        for (let j = 0; j < config.MAP_SIZE_Y; ++j) {
            array[i][j] = 0;
        }
    }

    let current = end,
        prev = prevArr[current.getX()][current.getY()];

    while(array[start.getX()][start.getY()] === 0){

        array[current.getX()][current.getY()] = -1;

        if(current.getX() === start.getX() && current.getY() === start.getY()){
            break;
        }
        console.log(current);

        current = prev;
        if(current === null){
            break;
        }
        prev = prevArr[current.getX()][current.getY()];

    }

    console.log(array);
    return array;
}

