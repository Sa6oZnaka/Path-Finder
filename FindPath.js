import {Step} from "./Step.js";
import {AStarMap} from "./AStarMap.js";

export class FindPath {

    constructor(map) {
        this.map = new AStarMap(map);

        this.open = [];
        this.closed = [];
    }

    addOpen(step) {
        this.open.push(step);
        return this;
    }

    // Remove a step that already exists by object memory address (not actual x and y values)
    removeOpen(step) {
        for (let i = 0; i < this.open.length; i++) {
            if (this.open[i] === step) this.open.splice(i, 1);
        }
        return this;
    }

    inOpen(step) {
        for (let i = 0; i < this.open.length; i++) {
            if (this.open[i].x === step.x && this.open[i].y === step.y) {
                return this.open[i];
            }
        }
        return false;
    }

    getBestOpen() {
        let bestId = 0;
        for (let i = 0; i < this.open.length; i++) {
            if (this.open[i].f < this.open[bestId].f) {
                bestId = i;
            }
        }
        return this.open[bestId];
    }

    addClosed(step) {
        this.closed.push(step);
        return this;
    }

    inClosed(step) {
        for (let i = 0; i < this.closed.length; i++) {
            if (this.closed[i].x === step.x && this.closed[i].y === step.y)
                return this.closed[i];
        }

        return false;
    }

    findPath(xC, yC, xT, yT) {
        let current,
            neighbors,
            neighborRecord,
            stepCost;

        this.reset()
            .addOpen(new Step(xC, yC, xT, yT, this.step, false));

        while (this.open.length !== 0) {
            current = this.getBestOpen();

            // Check if goal has been discovered to build a path
            if (current.x === xT && current.y === yT) {
                return this.buildPath(current, []);
            }

            // Move current into closed set
            this.removeOpen(current)
                .addClosed(current);

            // Get neighbors from the map and check them
            neighbors = this.map.getNeighbors(current.x, current.y);
            for (let i = 0; i < neighbors.length; i++) {
                // Get current step and distance from current to neighbor
                stepCost = current.g + this.map.getCost(current.x, current.y, neighbors[i].x, neighbors[i].y);

                // Check for the neighbor in the closed set
                // then see if its cost is >= the stepCost, if so skip current neighbor
                neighborRecord = this.inClosed(neighbors[i]);
                if (neighborRecord && stepCost >= neighborRecord.g)
                    continue;

                // Verify neighbor doesn't exist or new score for it is better
                neighborRecord = this.inOpen(neighbors[i]);
                if (!neighborRecord || stepCost < neighborRecord.g) {
                    if (!neighborRecord) {
                        this.addOpen(new Step(neighbors[i].x, neighbors[i].y, xT, yT, stepCost, current));
                    } else {
                        neighborRecord.parent = current;
                        neighborRecord.g = stepCost;
                        neighborRecord.f = stepCost + neighborRecord.h;
                    }
                }
            }
        }

        return false;
    }

    // path buliding method
    buildPath(tile, stack) {
        stack.push(tile);

        if (tile.parent) {
            return this.buildPath(tile.parent, stack);
        }
        return stack;
    }

    reset() {
        this.closed = [];
        this.open = [];
        return this;
    }
}