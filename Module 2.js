let allTodos = [
  {title: "1 second test todo", dueDate: "2/24/2021, 7:00:00 PM", description: "test", isComplete: false},
  {title: "2 my new todo", dueDate: "2/17/2021, 7:00:00 PM", description: "test", isComplete: true},
  {title: "3 second test todo", dueDate: "2/24/2021, 7:00:00 PM", description: "test", isComplete: false},
  {title: "4 my new todo", dueDate: "2/17/2021, 7:00:00 PM", description: "test", isComplete: true},
  {title: "5 second test todo", dueDate: "2/24/2021, 7:00:00 PM", description: "test", isComplete: false},
  {title: "6 my new todo", dueDate: "2/17/2021, 7:00:00 PM", description: "test", isComplete: false},

  ];

 // Expands the left menu - WORKS
$('.left-drawer').click( function () {

  $('#app').toggleClass('drawer-open')

})

//Adds class to modal  - works
$('.add-todo').click(function () {
  $('.modal').addClass('open')
})

//Removves class from modal - works
$('.cancel-create-todo').click(function () {
  $('.modal').removeClass('open')
 
})

//Reads to-do and returns object - works - Items get added to my todo list

function createTodoFromForm() {
  const createTodo = {
    title: $('#todo-title').val(),
    description: $('#todo-description').val(),
    dueDate: $('#todo-due-date').val(),
    isComplete: false
  }
 $('.todo-form').append(createTodo)
 return createTodo
}

//Puts to-dos on the page and in the appropriate column (pending/completed) - WORKS

function renderTodos() {
  $('main .content').empty();
  
  allTodos.forEach( function(todo) {
   const toDoElement = createElementFromTodo(todo)

   if (todo.isComplete) {
   return $('.completed-todos').append(toDoElement)

   } 
   $('.pending-todos').append(toDoElement)
})
}


/// Creates a to-do on click - WORKS
$('.create-todo').click(function (event) {
  event.preventDefault()

  allTodos.unshift(createTodoFromForm())
  $('.modal').removeClass('open')
  renderTodos()

  $('.todo-form').trigger('reset')
})


///Works from Module 1 but in Module two I have to add a click funciton and I hate it! - DOESN'T WORK

  function createElementFromTodo(todo) {
    // builds an element and returns it
    let newTodoElement = $('<div class="todo">').html(`
    <h3><span class="title">${todo.title}</span><span class="due-date">${todo.dueDate}</span></h3>
    <pre>${todo.description}</pre>
    <footer class="actions">
    <button class="action complete">Complete</button>
    <button class="action delete">Delete</button>
    </footer>
    </div>
    `);

    if (todo.isComplete) {
      newTodoElement.children(".actions").children(".complete").hide();
    };

    newTodoElement.data("todo", todo);


    $('main').on('click', '.action.complete', function () {
      const parentTodo = $(this).closest('.todo').data()
  
     parentTodo.todo.isComplete = true

      renderTodos();
   

    });


    return newTodoElement;


    
  
  }
  
   











renderTodos()
