import {Player} from '../src/player';

test('Player starts with 0 points', () => {
    const player = new Player;
    expect(player.currentCount()).toBe(0);
});

test('If 350 points where added, then the count will increase 350 points', () => {
    const player = new Player;
    player.addCount(350)
    expect(player.currentCount()).toBe(350);
});

test('Cannot add numbers that dont devide by 50', () => {
    const player = new Player;
    expect(() => player.addCount(370)).toThrow('Rolled number is not dividably by 50');
});

test('Cannot add numbers under 350', () => {
    const player = new Player;
    expect(() => player.addCount(300)).toThrow('Rolled number is below 350');
});

test('Two player will have a different state', () => {
    const playerOne = new Player;
    playerOne.addCount(350)
    const playerTwo = new Player;
    playerTwo.addCount(1350)
    expect(playerOne.currentCount()).toBe(350);
    expect(playerTwo.currentCount()).toBe(1350);
});