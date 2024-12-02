interface Game {
    // Represents a single game with its details
    id: string, // Unique identifier for the game
    whiteBoardPlayer: string, // Name of the player using white pieces
    blackPlayer: string, // Name of the player using black pieces
    moves: string[] // Array to track the moves made in the game
}

export class GameManager {

    // Array to store all active games
    games: Game[] = [];

    // Singleton instance of GameManager
    private static instance: GameManager;

    // Private constructor to enforce singleton pattern
    private constructor() {
        this.games = [];
    }

    // Method to retrieve the singleton instance of GameManager
    static getInstance() {
        if (GameManager.instance) {
            return GameManager.instance; // Return the existing instance if it exists
        }
        GameManager.instance = new GameManager(); // Create a new instance if it doesn't exist
        return GameManager.instance;
    }

    // Method to add a move to a specific game
    addMove(gameId: string, move: string) {
        console.log(`Adding ${move} to ${gameId}`); // Log the move being added
        const game = this.games.find(game => game.id === gameId); // Find the game by its ID
        game?.moves.push(move); // Add the move to the game's moves array if the game exists
    }

    // Method to add a new game to the games array
    addGame(gameId: string) {
        const game: Game = {
            id: gameId, // Unique identifier for the game
            whiteBoardPlayer: 'izhar', // Default white player
            blackPlayer: 'ace', // Default black player
            moves: [] // Initialize with an empty moves array
        }
        this.games.push(game); // Add the new game to the games array
    }

    // Method to log all the games to the console
    log() {
        console.log(this.games); // Log the current state of the games array
    }

}
