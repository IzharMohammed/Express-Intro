import { pubSubManager } from "./pubSubManager";

const pubSub = pubSubManager.getInstance();
const redispublisher = pubSub.getPublisherClient();

// Users subscribe to different stocks
pubSub.userSubscribe("user3", "AAPL");
pubSub.userSubscribe("user4", "AAPL");
pubSub.userSubscribe("user1", "MSFT");

// Simulate messages being published
redispublisher.publish("AAPL", "Apple stock price is $155");
redispublisher.publish("MSFT", "Microsoft stock price is $310");

// Delay for message handling
setTimeout(() => {
    pubSub.disconnect();
}, 1000);
