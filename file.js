const fs = require("fs");

// Sync - Write to a file synchronously
fs.writeFileSync("./test.txt", "Hello World from sync");

// Async - Write to a file asynchronously
fs.writeFile("./test1.txt", "Hello world from Async" , (err)=>{
    // Callback function to handle any errors
    if (err) {
        console.error("Error writing file asynchronously", err);
    }
});

// Synchronously read from the file and log the result
const result = fs.readFileSync("./test1.txt" , "utf-8");
console.log("read file sync", result);

// Asynchronously read from the file and log the result
fs.readFile("./test.txt", "utf-8" , (err , result)=>{
    if(err){
        console.log("Error", err);
    }else{
        console.log("read file", result);
    }
});

// Append current text without modifying the existing content
fs.appendFileSync("./test.txt" , `${Date.now()} appending\n`);

// Log file statistics synchronously
console.log(fs.statSync("test.txt"));

// Create directories recursively
fs.mkdirSync("hooks/a/b", {recursive : true});
