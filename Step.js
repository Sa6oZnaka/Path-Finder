import {Point} from "./Point.js";

export class Step extends Point {

    constructor(xC, yC, xT, yT, totalSteps, parentStep) {
        super(xC, yC);

        this.g = totalSteps;
        this.h = this.distance(xC, yC, xT, yT);
        this.f = totalSteps + this.h;
        this.parent = parentStep;
    }

    distance(xC, yC, xT, yT) {
        let dx = Math.abs(xT - xC),
            dy = Math.abs(yT - yC);
        return dx + dy;
    }
}

