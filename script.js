

let getTask = document.querySelector('#description-task');
let btnAdd = document.querySelector('#add-task-btn');
let listItems = document.querySelector('.listers');



let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;

}


const createTemplate = (task, index) => {
    return `
            <div class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description"> ${task.description} </div>
            <form class="buttons">
                        <div class="buttons__checkbox">
                             <input onclick = "completTask(${index})"class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
                         </div>
                        <div class="buttons__del">
                        <div onclick = "deleteTask(${index})" class="btn-delet">Удалить</div>
                    </div>

            </form>
            </div>
            `
}

const filterTask = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks, ...completedTasks];
}



const fillHtmlList = () => {
    listItems.innerHTML = "";
    if (tasks.length > 0) {
        filterTask();
        tasks.forEach((item, index) => {

            listItems.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo-item');

    }
}
fillHtmlList();



const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}




const completTask = index => {

    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemElems[index].classList.add('checked')
    } else {
        todoItemElems[index].classList.remove('checked')
    }
    updateLocal();
    fillHtmlList();

}

getTask.addEventListener('keypress', () => {
    if (event.key == 'Enter' && getTask.value !== "") {

        tasks.push(new Task(getTask.value));
        updateLocal();
        fillHtmlList();
        getTask.value = "";
    }

});


btnAdd.addEventListener('click', () => {
    if (getTask.value !== "") {
        tasks.push(new Task(getTask.value));
        updateLocal();
        fillHtmlList();
    }

    getTask.value = "";
})

const deleteTask = index => {
    todoItemElems[index].classList.add('delition')
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    }, 500)



}



