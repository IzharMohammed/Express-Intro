import { pubSubManager } from "./pubSubManager"

setInterval(()=>{
    pubSubManager.getInstance().userSubscribe(Math.random().toString());
},5000)