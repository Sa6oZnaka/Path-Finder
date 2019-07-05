export class Step {

    constructor(xC, yC, xT, yT, totalSteps, parentStep){
        var h = this.distanceM(xC, yC, xT, yT);

        this.x = xC;
        this.y = yC;
        this.g = totalSteps;
        this.h = h;
        this.f = totalSteps + h;
        this.parent = parentStep;
    }

    distanceM (xC, yC, xT, yT) {
        var dx = Math.abs(xT - xC), dy = Math.abs(yT - yC);
        return dx + dy;
    }


}