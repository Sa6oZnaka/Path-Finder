import {config} from "./config.js";
import {Point} from "./Point.js";
import {GameMap} from "./GameMap.js";

let gridSize = config.GRID_CELL_SIZE;
let gridCellMargin = config.GRID_CELL_MARGIN;

let start = new Point(7, 14);
let end  = new Point(0, 1);

let gameConfig = {
    width: 1400,
    height: 600,
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: {
        create: create
    }
};

let game = new Phaser.Game(gameConfig);

function create () {

    let matrix = findRoute(start, end);
    let solutionMatrix = showRoute(matrix.getAllPrevious(), start, end);

    matrix = matrix.getValues();

    let graphics = this.add.graphics({ fillStyle: { color: 0x0000ff }, lineStyle: { color: 0x0000aa } });
    let text = this.add.text(0, 0, '', { font: '15px Courier', fill: '#0f0' });

    let solutionText = this.add.text(700, 0, 'frefre', { font: '15px Courier', fill: '#ff0' });

    let rectangles = [];

    for(let x = 0; x < config.MAP_SIZE_X; x++) {
        rectangles[x] = [];
        for(let y = 0; y < config.MAP_SIZE_Y; y++) {
            rectangles[x][y] = new Phaser.Geom.Rectangle(
                x * gridSize,
                y * gridSize,
                gridSize - gridCellMargin,
                gridSize - gridCellMargin
            );
        }
    }


    redraw();

    function redraw () {
        graphics.clear();

        for(var x = 0; x < config.MAP_SIZE_X; x++) {
            for(var y = 0; y < config.MAP_SIZE_Y; y++) {
                matrix = Phaser.Utils.Array.Matrix.ReverseRows(matrix);
                text.setText(Phaser.Utils.Array.Matrix.MatrixToString(matrix));

                solutionMatrix = Phaser.Utils.Array.Matrix.ReverseRows(solutionMatrix);
                solutionText.setText(Phaser.Utils.Array.Matrix.MatrixToString(solutionMatrix));
            }
        }
    }
}

function findRoute(start, end){

    let numbers = new GameMap(config.MAP_SIZE_X, config.MAP_SIZE_Y, 0);

    numbers.setField(start.getX(), start.getY(), 1);
    numbers.setField(1,1,-1);
    numbers.setField(1,0,-1);
    for(let i = 0; i < 10; i ++){
        numbers.setField(i, 5, -1);
    }
    for(let i = 0; i < 3; i ++){
        numbers.setField(7, i, -1);
    }
    for(let i = 1; i < 5; i ++){
        numbers.setField(3, i, -1);
    }
    for(let i = 0; i < config.MAP_SIZE_X; i ++){
        numbers.setField(12, i, -1);
    }

    while (numbers.getFieldValue(end.getX(), end.getY()) === 0) {
        for (let i = 0; i < config.MAP_SIZE_X; i++) {
            for (let j = 0; j < config.MAP_SIZE_Y; j++) {
                if(numbers.getFieldValue(i, j) > 0){
                    let valueOfCurrent = numbers.getFieldValue(i, j);
                    let currentPoint = new Point(i, j);

                    if(i > 0 && numbers.getFieldValue(i - 1, j) === 0){
                        numbers.setField(i - 1, j, valueOfCurrent + 1);
                        numbers.setPrev(i - 1, j, currentPoint);
                    }
                    if(i + 1 < config.MAP_SIZE_X && numbers.getFieldValue(i + 1, j) === 0){
                        numbers.setField(i + 1, j, valueOfCurrent + 1);
                        numbers.setPrev(i + 1, j, currentPoint);
                    }
                    if(j > 0 && numbers.getFieldValue(i, j - 1) === 0){
                        numbers.setField(i, j - 1, valueOfCurrent + 1);
                        numbers.setPrev(i, j - 1, currentPoint);
                    }
                    if(j + 1 < config.MAP_SIZE_Y && numbers.getFieldValue(i, j + 1) === 0){
                        numbers.setField(i, j + 1, valueOfCurrent + 1);
                        numbers.setPrev(i, j + 1, currentPoint);
                    }
                }
            }
        }
    }

    console.log(JSON.stringify(numbers.getAllPrevious()));
    console.log(JSON.stringify(numbers.getValues()));

    return numbers;
}

function showRoute(prevArr, start, end) {

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

        current = prev;
        prev = prevArr[current.getX()][current.getY()];

    }

    console.log(array);
    return array;
}

