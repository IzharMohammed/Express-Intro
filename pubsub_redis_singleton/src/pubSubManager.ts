import { createClient, RedisClientType } from "redis";

export class pubSubManager {
    private static instance: pubSubManager;
    public redisClient: RedisClientType;
    private publisherClient: RedisClientType;
    private subscriptions: Map<string, string[]>;
    // static redisClient: RedisClientType;

    private constructor() {
        this.redisClient = createClient();
        this.redisClient.connect();
        this.publisherClient = createClient();
        this.publisherClient.connect();
        this.subscriptions = new Map();
    }

    public static getInstance(): pubSubManager {
        if (!pubSubManager.instance) {
            pubSubManager.instance = new pubSubManager();
        }
        return pubSubManager.instance;
    }

    public getPublisherClient(): RedisClientType{
        return this.publisherClient;
    }


    public userSubscribe(userId: string, stock: string) {
        if (!this.subscriptions.has(stock)) {
            console.log(`2 :- ${this.subscriptions.has(stock)}`);
            console.log(`subscriptions: ${JSON.stringify(Object.fromEntries(this.subscriptions))}, stock: ${stock}`);
            this.subscriptions.set(stock, []);
            console.log(`1 :- ${JSON.stringify(this.subscriptions.get(stock))}`);
        }

        this.subscriptions.get(stock)?.push(userId);
        console.log(`pushing ${userId} into ${this.subscriptions.get(stock)}`);

        if (this.subscriptions.get(stock)?.length === 1) {
            console.log(`length:- ${this.subscriptions.get(stock)?.length}, ${this.subscriptions.get(stock)}`);

            this.redisClient.subscribe(stock, (message) => {
                console.log(`stock:- ${stock} message:- ${message}`);
                this.handleMessage(stock, message);
            })
        }

        // this.redisClient.on('subscribe', (channel:string, count:number) => {
        //     console.log(`Subscribed to ${channel}. Total subscriptions: ${count}`);
        // });
        

        console.log(`Subscribed to Redis channel: ${stock}`);

    }

    public userUnSubscribe(userId: string, stock: string) {
        this.subscriptions.set(stock, this.subscriptions.get(stock)?.filter(id => id != userId) || []);

        if (this.subscriptions.get(stock)?.length === 0) {
            this.redisClient.unsubscribe(stock);
            console.log(`UnSubscribed to Redis channel: ${stock}`);
        }
    }

    public handleMessage(stock: string, message: string) {
        console.log(`Message received on channel ${stock}: ${message}`);
        this.subscriptions.get(stock)?.forEach((sub) => {
            console.log(`Sending message to user: ${sub}`);
        })
    }

    public async disconnect() {
        await this.redisClient.quit();
    }
}