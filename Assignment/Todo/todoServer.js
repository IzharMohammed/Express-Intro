/*
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());

function readTodos() {
  if (fs.existsSync('./config.json')) {
    const data = fs.readFileSync('./config.json', 'utf-8');
    return JSON.parse(data);
  }
  return [];
}

function writeTodos(todo) {
  let data = JSON.stringify(todo);
  fs.writeFileSync('./config.json', data, function (err) {
    if (err) throw err;
    console.log('Added todo successfully !!!')
  });
}

app.get('/todos', (req, res) => {
  const todos = readTodos();
  res.json({
    todos
  })
})

app.get('/todos/:id', (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  todos.map(todo => {
    if (todo.id == id) [
      res.json({
        todo
      })
    ]
  })
})


app.post('/todos', (req, res) => {
  const todo = req.body;
  const todosData = readTodos();
  todosData.push(todo);
  writeTodos(todosData);

  res.json({
    msg: 'Added todo successfully'
  })
})

app.put('/todos/:id', (req, res) => {
  let id = req.params.id;
  /*  todos.map(todo =>{
    if(todo.id == id){
      {...todo , description : updateddescription}
      }
      }) */
  let { title, description } = req.body;
  const todos = readTodos();
  const todoIndex = todos.find(todo => todo.id === id);
  console.log('index',todoIndex.id);
 /*  todos[todoIndex.id] = { id, title, description };
  console.log('before',todos);
  writeTodos(todos); */
  todos.map(todo => {
    if(todo.id === id){
      todo.title = title,
      todo.description = description
    }
  })
  writeTodos(todos);
  res.json({
    msg: "updated todo successfully"
  })

})

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;
  const todos = readTodos();
  let todosData = todos.filter(todo => todo.id != id);
  writeTodos(todosData);

  res.json({
    msg: 'Deleted todo successful'
  })
})


app.use((error, req, res, next) => {
  res.status(500).send('Something went wrong !!!');
})

app.listen(3000, () => {
  console.log('server is up');
});