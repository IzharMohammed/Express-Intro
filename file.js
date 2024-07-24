const fs = require("fs");

// Sync ... 
fs.writeFileSync("./test.txt", "Hello World from sync");

// async
fs.writeFile("./test1.txt", "Hello world from Async" , (err)=>{});

const result = fs.readFileSync("./test1.txt" , "utf-8");
console.log("read file sync", result);

fs.readFile("./test.txt", "utf-8" , (err , result)=>{
    if(err){
        console.log("Error", err);
    }else{
        console.log(" read file ", result);
    }
})

//used to append current text without modifying
fs.appendFileSync("./test.txt" , `${Date.now()} appending\n`);
