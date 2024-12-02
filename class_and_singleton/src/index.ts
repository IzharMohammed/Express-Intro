import { startLogger } from "./logger"; 
import { GameManager } from "./store"; 

// Start the logger service to track or log activity
startLogger();

// Use setInterval to add a new game to the GameManager instance every 5 seconds
setInterval(() => {
    GameManager.getInstance().addGame(
        Math.random().toString(), // Generate a random string to use as a unique game ID
    );
}, 5000); // Interval set to 5000 milliseconds (5 seconds)
