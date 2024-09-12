export class Player {
    private points: number;
    constructor() {
        this.points = 0;
    }

    public currentCount(): number {
        return this.points;
    }

    public addCount(rolled: number): void {
        if (!this.isDivisibleBy50(rolled)) {
            throw new Error('Rolled number is not dividably by 50');
        }
        if (rolled < 350) {
            throw new Error('Rolled number is below 350');
        }
        this.points += rolled;
    }

    private isDivisibleBy50(num: number): boolean {
        return num % 50 === 0;
    }
}