"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    points;
    constructor() {
        this.points = 0;
    }
    currentCount() {
        return this.points;
    }
    addCount(rolled) {
        if (!this.isDivisibleBy50(rolled)) {
            throw new Error('Rolled number is not dividably by 50');
        }
        if (rolled < 350) {
            throw new Error('Rolled number is below 350');
        }
        this.points += rolled;
    }
    isDivisibleBy50(num) {
        return num % 50 === 0;
    }
}
exports.Player = Player;
