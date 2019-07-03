export class Field {

    constructor(value){
        this.value = value;
        this.prev = null;
    }

    getPrev(){
        return this.prev;
    }

    getField(){
        return this.value;
    }

    setPrev(prev){
        this.prev = prev;
    }

    setField(value){
        this.value = value;
    }
}