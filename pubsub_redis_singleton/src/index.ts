import { pubSubManager } from "./pubSubManager";

const pubSub = pubSubManager.getInstance();
const redispublisher = pubSub.getPublisherClient();

/* 1. Multiple Users Subscribe to the Same Stock */

// Users subscribe to TSLA
// pubSub.userSubscribe("user1", "TSLA");
// pubSub.userSubscribe("user2", "TSLA");

// // Simulate a message being published
// redispublisher.publish("TSLA", "Tesla stock price is $700");





/* 2. Multiple Stocks with Multiple Users */

// // Users subscribe to different stocks
// pubSub.userSubscribe("user3", "AAPL");
// pubSub.userSubscribe("user4", "AAPL");
// pubSub.userSubscribe("user1", "MSFT");

// // Simulate messages being published
// redispublisher.publish("AAPL", "Apple stock price is $155");
// redispublisher.publish("MSFT", "Microsoft stock price is $310");

// // Delay for message handling
// setTimeout(() => {
//     pubSub.disconnect();
// }, 1000);

// setInterval(() => {
//     pubSub.userSubscribe(Math.random().toString(), "APPL");
//     redispublisher.publish("AAPL", "Apple stock price is $155");
// }, 5000)




/* 3. User Unsubscribes from a Stock */

// User subscribes and then unsubscribes
// pubSub.userSubscribe("user1", "GOOG");
// pubSub.userUnSubscribe("user1", "GOOG");

// // Simulate a message being published
// pubSub.redisClient.publish("GOOG", "Google stock price is $2800");