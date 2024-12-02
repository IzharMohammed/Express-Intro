interface Game {
    id: string,
    whiteBoardPlayer: string,
    blackPlayer: string,
    moves: string[]
}

export  class GameManager {

    games: Game[] = [];

    private static instance: GameManager;

    private constructor() {
        this.games = [];
    }

    static getInstance() {
        if (GameManager.instance) {
            return GameManager.instance;
        }
        GameManager.instance = new GameManager();
        return GameManager.instance;
    }

    addMove(gameId: string, move: string) {
        console.log(`Adding ${move} to ${gameId}`);
        const game = this.games.find(game => game.id === gameId);
        game?.moves.push(move);
    }

    addGame(gameId: string) {
        const game: Game = {
            id: gameId,
            whiteBoardPlayer: 'izhar',
            blackPlayer: 'ace',
            moves: []
        }
        this.games.push(game);
    }

    log() {
        console.log(this.games);
    }

}
