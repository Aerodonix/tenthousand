import { roll } from '../src/roll'

test('Roll should return a number between 1 and 6', () => {
    const rolledValue: number = roll();
    expect(rolledValue).toBeGreaterThanOrEqual(1); // Check if >= 1
    expect(rolledValue).toBeLessThanOrEqual(6);    // Check if <= 6
});