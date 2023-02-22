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
    }
}
function DeleteTodo(deleteBtn){
    deleteBtn.parentElement.remove();
}