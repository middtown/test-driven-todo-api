// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];


/**********
 * ROUTES *
 **********/


/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */


//show all todos
app.get('/api/todos', function index(req, res) {
res.json({ todos: todos });        
// What are you going to send back to the client?
});




//create new todo
app.post('/api/todos', function create(req, res) {
    console.log("created new todo.");
    var newTodo = req.body;
      if (todos.length > 0) { 
        newTodo._id = todos[todos.length - 1]._id + 1; //increment id by one
      } else {
        newTodo._id = 1;
    }
    // add newTodo to `todos` array
    todos.push(newTodo);
    // send newTodo as JSON response
    res.json(newTodo);
});

//get todo by id
app.get('/api/todos/:id', function show(req, res) {
    res.send(todos.find(function(todos){
      return todos._id === Number(req.params.id);
    }));
});

//update a todo
app.put('/api/todos/:id', function update(req, res) {
    
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
  var updateTodo = todos.find(function(todos){
      return todos._id === Number(req.params.id);
  });
    if(req.body.task) 
      updateTodo.task = req.body.task;
    if(req.body.description) 
      updateTodo.description = req.body.description;
      res.send(updateTodo);
});

// delete a task
app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */
  var deleteTodo = todos.find(function(todos){
    return todos._id === Number(req.params.id);
  });
    res.send(deleteTodo);
  todos.splice(todos.indexOf(deleteTodo),1);
});


app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

//Search Todos By Task
app.get('/api/todos/search', function search(req, res) {
    res.send({todos:todos.filter(function(search){
      return search.task === req.query.q;})
    });
});
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
