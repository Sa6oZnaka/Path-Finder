export class Field {

    constructor(explored){
        this.explored = explored;
        this.prev = null;
        if(explored === undefined) {
            this.explored = false;
        }
    }

    getPrev(){
        return this.prev;
    }

    getExplored(){
        return this.explored;
    }

    setPrev(prev){
        this.prev = prev;
    }

    Explore(){
        this.explored = true;
    }
}