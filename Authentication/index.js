const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// In-memory array of user objects
const ALL_USERS = [
    {
        username: "harkirat@gmail.com",
        password: "123",
        name: "harkirat singh",
    },
    {
        username: "raman@gmail.com",
        password: "123321",
        name: "Raman singh",
    },
    {
        username: "priya@gmail.com",
        password: "123321",
        name: "Priya kumari",
    },
];

// Function to check if a user exists in ALL_USERS array
function userExists(username, password) {
    const result = ALL_USERS.find(user => user.username === username && user.password === password);
    return result; // Returns the user object if found, otherwise undefined
}

// Route to handle user sign-in
app.post("/signin", function (req, res) {
    const username = req.body.username; // Extract username from request body
    const password = req.body.password; // Extract password from request body

    // Check if user exists
    if (!userExists(username, password)) {
        return res.status(403).json({
            msg: "User doesn't exist in our in-memory db",
        });
    }

    // Create a JWT token for the user
    var token = jwt.sign({ username: username }, jwtPassword);
    return res.json({
        token,
    });
});

// Route to get all users (requires valid token)
app.get("/users", function (req, res) {
    const token = req.headers.authorization; // Extract token from request headers
    try {
        const decoded = jwt.verify(token, jwtPassword); // Verify the token
        const username = decoded.username; // Extract username from decoded token
        // return a list of users other than this username
    } catch (err) {
        return res.status(403).json({
            msg: "Invalid token",
        });
    }
    res.json(ALL_USERS); // Return the list of all users
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('server is up !!!');
});
