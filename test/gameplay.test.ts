import { Gameplay } from '../src/gameplay'
import { Player } from '../src/player'

test('Init the game with one player', () => {
    const player = new Player();
    const gameplay = new Gameplay([player]);
    
})