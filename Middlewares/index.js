const zod = require('zod');
const express = require('express');

const app = express();

/*
What if we are adding different routes for different requests then we have to make separate function 
for user validation and input validation and we have to call as a function in different routes for diff. requests  --> This is slightly better approach but the best approach is middlewares
We can use middlewares for solving this problem 
*/

    // Method - 1 (Bad Approach)
app.get('/health', (req, res) => {
    const id = req.query.kidneyId; // Accessing the kidneyId query parameter
    const username = req.headers.username; // Accessing the username from headers
    const password = req.headers.password; // Accessing the password from headers

    // User validation
    if (username != 'izhar' || password != '123') {
        res.status(403).json({
            msg: 'user doesnt exist'
        })
        return;
    }

    // Input validation
    if (id != '1' && id != '2') {
        res.status(411).json({
            msg: 'wrong inputs'
        })
        return;
    }

    res.send('your heart is healthy');
})

    // Method - 2 (Best Approach) - Middlewares
// Middleware for user validation
function userMiddleware(req, res, next) {
    const username = req.headers.username; // Accessing the username from headers
    const password = req.headers.password; // Accessing the password from headers
    if (username != 'izhar' || password != '123') {
        res.status(403).json({
            msg: 'user doesnt exist'
        })
    } else {
        next(); // Call next middleware or route handler if validation passes
    }
}

// Middleware for input validation
function inputMiddleware(req, res, next) {
    const id = req.query.kidneyId; // Accessing the kidneyId query parameter
    if (id != '1' && id != '2') {
        res.status(411).json({
            msg: 'wrong inputs'
        })
    } else {
        next(); // Call next middleware or route handler if validation passes
    }
}

// Route using middlewares for validation
app.get('/health1', userMiddleware, inputMiddleware, (req, res) => {
    res.send('your heart is healthy');
})

// Function to validate input using zod
function validateInput(obj){
    /*
    Schema for below scenario :-
    {
    email : string -> should look like email
    password : string -> should have 4 characters
    country : "US" , "IN"
    }
    */
    const schema = zod.object({
        email: zod.string().email(), // Email should be a valid email
        password: zod.string().min(4), // Password should have at least 4 characters
        country :zod.union([
            zod.literal("IN"),
            zod.literal("US"),
            zod.literal("UK"),
            zod.literal("CA"),
            zod.literal("AU")
        ])
    })

    const response = schema.safeParse(obj);
    console.log(response); // Log the validation result
}

// Validate input example
validateInput({
    email: 'izhar@gmail.com',
    password: '1234',
    country : "IN"
})

// Global error handler middleware
app.use((error, req, res, next) => {
    res.status(500).send('Something went wrong !!!')
})

// Start the server
app.listen(3000, () => {
    console.log('server is up !!!');
})
