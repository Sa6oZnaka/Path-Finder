export class Field {

    constructor(value, prev){
        this.value = value;
        if(prev === undefined){
            this.prev = null;
        }else{
            this.prev = prev;
        }
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