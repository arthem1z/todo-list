window.onload = DisplayTodos();

document.getElementById("add-btn").addEventListener('click', AddTodo);
document.getElementById("todo-input").addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        AddTodo();
    }
});
function AddTodo(){
    var todo = document.getElementById("todo-input").value;
    if(todo != ""){
        document.getElementById("todo-input").value = "";
        var todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        todoItem.classList.add("item-bottom");
        todoItem.innerHTML = `
        <p>${todo}</p>
        <p class="delete">&#10006</p>`;
        document.getElementById("todo-list").appendChild(todoItem);
        todoItem.getElementsByClassName("delete")[0].addEventListener('click', function(e){
            e.stopImmediatePropagation();
            DeleteTodo(this);
        });
        if(document.cookie == '['){
            document.cookie = document.cookie + '{"todo": "' + todo + '"}';
        }else{
            document.cookie = document.cookie + ',{"todo": "' + todo + '"}';
        }
    }
}
function DeleteTodo(deleteBtn){
    var todos = JSON.parse(document.cookie + ']');
    var todo = deleteBtn.parentElement.firstElementChild.innerHTML;
    for(var i=0; i<todos.length; i++){
        if(todos[i].todo === todo){
            todos.splice(i, 1);
            i = todos.length;
        }
    }
    var todosStr = JSON.stringify(todos);
    //Remove the ']' at the end of the string
    document.cookie = (todosStr.substring(0, todosStr.length-1));
    deleteBtn.parentElement.remove();
}
function DisplayTodos(){
    if(document.cookie.length == 0){
        document.cookie = '['
    }else if(document.cookie != '['){
        var todos = JSON.parse(document.cookie + ']');
        for(var i=0; i<todos.length; i++){
            var todoItem = document.createElement('li');
            todoItem.className = 'todo-item';
            todoItem.classList.add("item-bottom");
            todoItem.innerHTML = `
            <p>${todos[i].todo}</p>
            <p class="delete">&#10006</p>`;
            document.getElementById("todo-list").appendChild(todoItem);
            todoItem.getElementsByClassName("delete")[0].addEventListener('click', function(e){
                e.stopImmediatePropagation();
                DeleteTodo(this);
            });
        }
    }
}