let allTodos = [
  {title: "1 second test todo", dueDate: "2/24/2021", description: "test", isComplete: false},
  {title: "2 my new todo", dueDate: "2/17/2021", description: "test", isComplete: true},
  {title: "3 second test todo", dueDate: "2/24/2021", description: "test", isComplete: false},
  {title: "4 my new todo", dueDate: "2/17/2021", description: "test", isComplete: true},
  {title: "5 second test todo", dueDate: "2/24/2021", description: "test", isComplete: false},
  {title: "6 my new todo", dueDate: "2/17/2021", description: "test", isComplete: false},

  ];

  let pendingTodos = []
  let completedTodos = []
  let expiredTodos = []


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



function renderTodos() {
  
  $("main .content").empty();
  
  pendingTodos.forEach((todo) => {
    const builtToDo = createElementFromTodo(todo);
    $(".pending-todos").append(builtToDo);
  });

  completedTodos.forEach((todo) => {
    const builtToDo = createElementFromTodo(todo);
    $(".completed-todos").append(builtToDo);
  });

  expiredTodos.forEach((todo) => {
    const builtToDo = createElementFromTodo(todo);
    $(".expired-todos").append(builtToDo);
  });
}



/// Creates a to-do on click - WORKS
$('.create-todo').click(function (event) {
  event.preventDefault()

  allTodos.unshift(createTodoFromForm())
  $('.modal').removeClass('open')
  
  splitTodos()
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

// Eds solution below - caused error. Time ran out and we could not complete
    // $('main').on('click', '.action.complete', function () {
    //   const parentTodo = $(this).closest('.todo').data()
  
    //  parentTodo.todo.isComplete = true

    //  renderTodos();
   
    // });


    $("main").on("click", ".action.complete", function () {
      let parentTodo = $(this).closest(".todo");
      
      let todoData = parentTodo.data();
      
      todoData.todo.isComplete = true;
      
      parentTodo.slideUp(function () {
        splitTodos();
        renderTodos();
      });
    });


    return newTodoElement;
  }
  
   
  function isCurrent(todo) {
    const todoDueDate = new Date(todo.dueDate);
    const now = new Date();
  
    return now < todoDueDate;

  }


  function splitTodos() {
    pendingTodos = allTodos.filter(function (todo) {
      return !todo.isComplete && isCurrent(todo);
    });
   
    completedTodos = allTodos.filter(function (todo) {
      return todo.isComplete;
    });

    expiredTodos = allTodos.filter(function (todo) {
      return !todo.isComplete && !isCurrent(todo);
    });
 
  }


function storeData () {
  localStorage.setItem('allTodos', JSON.stringify(allTodos))
}

function retrieveData () {
  allTodos = JSON.parse(localStorage.getItem('allTodos')) || fetchDefaultTodos()

}

function fetchDefaultTodos () {
  return  [
    {title: "Get Food", dueDate: "2/24/2021", description: "test", isComplete: false},
    {title: "Get Water", dueDate: "2/17/2021", description: "test", isComplete: true},
    {title: "Get Gas", dueDate: "2/24/2021", description: "test", isComplete: false},
    {title: "Get Cigs", dueDate: "2/17/2021", description: "test", isComplete: true},
  
    ];
}

splitTodos()

renderTodos()
