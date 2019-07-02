import {Field} from "./Field.js";

export class GameMap {

    constructor(sizeX, sizeY, initalValue){
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.map = this.mapInit(sizeX, sizeY,initalValue);
    }

    mapInit(n, m, v){
        let array = [];
        for (let i = 0; i < n; ++i) {
            array[i] = [];
            for (let j = 0; j < m; ++j) {
                array[i][j] = new Field(v);
            }
        }
        return array;
    }

    getValues(){
        let array = [];
        for (let i = 0; i < this.sizeX; ++i) {
            array[i] = [];
            for (let j = 0; j < this.sizeY; ++j) {
                array[i][j] = this.map[i][j].getField();
            }
        }
        return array;
    }

    getAllPrevious(){
        let array = [];
        for (let i = 0; i < this.sizeX; ++i) {
            array[i] = [];
            for (let j = 0; j < this.sizeY; ++j) {
                array[i][j] = this.map[i][j].getPrev();
            }
        }
        return array;
    }

    setField(x, y, value){
        this.map[x][y] = new Field(value);
    }

    getFieldValue(x, y){
        return this.map[x][y].getField();
    }

    setPrev(x, y, value){
        this.map[x][y].setPrev(value);
    }

}