import { createClient, RedisClientType } from "redis";

export class pubSubManager {
    private static instance: pubSubManager;
    private redisClient: RedisClientType;
    private subscriptions: Map<string, string[]>;

    private constructor() {
        this.redisClient = createClient();
        this.redisClient.connect();
        this.subscriptions = new Map();
    }

    public static getInstance() {
        if (!pubSubManager.instance) {
            pubSubManager.instance = new pubSubManager();
        }
        return pubSubManager.instance;
    }

    public userSubscribe(){}

    public userUnsubscribe(){}

    public handleMessage(){}

    public async disconnect(){}
}