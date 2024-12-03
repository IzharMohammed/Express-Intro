import { createClient, RedisClientType } from "redis";

export class pubSubManager {
    // Singleton instance of pubSubManager
    private static instance: pubSubManager;

    // Redis clients: one for subscribing, the other for publishing
    public redisClient: RedisClientType; // Subscriber client
    private publisherClient: RedisClientType; // Publisher client

    // Map to store subscriptions where the key is the stock name and the value is an array of user IDs
    private subscriptions: Map<string, string[]>;

    // Private constructor to enforce the singleton pattern
    private constructor() {
        // Initialize and connect the subscriber Redis client
        this.redisClient = createClient();
        this.redisClient.connect();

        // Initialize and connect the publisher Redis client
        this.publisherClient = createClient();
        this.publisherClient.connect();

        // Initialize the Map to track subscriptions
        this.subscriptions = new Map();
    }

    // Static method to retrieve the singleton instance of pubSubManager
    public static getInstance(): pubSubManager {
        if (!pubSubManager.instance) {
            pubSubManager.instance = new pubSubManager();
        }
        return pubSubManager.instance;
    }

    // Method to retrieve the publisher Redis client
    public getPublisherClient(): RedisClientType {
        return this.publisherClient;
    }

    // Method to subscribe a user to a stock
    public userSubscribe(userId: string, stock: string) {
        // Check if the stock is already being tracked in subscriptions
        if (!this.subscriptions.has(stock)) {
            console.log(`2 :- ${this.subscriptions.has(stock)}`); // Logs if the stock exists
            console.log(`subscriptions: ${JSON.stringify(Object.fromEntries(this.subscriptions))}, stock: ${stock}`);
            
            // If not, initialize an empty array for the stock
            this.subscriptions.set(stock, []);
            console.log(`1 :- ${JSON.stringify(this.subscriptions.get(stock))}`);
        }

        // Add the user to the stock's subscription list
        this.subscriptions.get(stock)?.push(userId);
        console.log(`pushing ${userId} into ${this.subscriptions.get(stock)}`);

        // If this is the first user subscribing to this stock, set up a Redis subscription
        if (this.subscriptions.get(stock)?.length === 1) {
            console.log(`length:- ${this.subscriptions.get(stock)?.length}, ${this.subscriptions.get(stock)}`);

            // Subscribe to the stock's channel and handle incoming messages
            this.redisClient.subscribe(stock, (message) => {
                console.log(`stock:- ${stock} message:- ${message}`);
                this.handleMessage(stock, message);
            });
        }

        // Log successful subscription
        console.log(`Subscribed to Redis channel: ${stock}`);
    }

    // Method to unsubscribe a user from a stock
    public userUnSubscribe(userId: string, stock: string) {
        // Remove the user from the stock's subscription list
        this.subscriptions.set(stock, this.subscriptions.get(stock)?.filter(id => id !== userId) || []);

        // If no users remain subscribed to the stock, unsubscribe from the Redis channel
        if (this.subscriptions.get(stock)?.length === 0) {
            this.redisClient.unsubscribe(stock);
            console.log(`UnSubscribed to Redis channel: ${stock}`);
        }
    }

    // Method to handle messages received from Redis channels
    public handleMessage(stock: string, message: string) {
        console.log(`Message received on channel ${stock}: ${message}`);
        
        // Notify all users subscribed to this stock
        this.subscriptions.get(stock)?.forEach((sub) => {
            console.log(`Sending message to user: ${sub}`);
        });
    }

    // Method to disconnect and clean up Redis client connections
    public async disconnect() {
        await this.redisClient.quit();
    }
}
