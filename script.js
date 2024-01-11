function addTask() {
    const taskName = document.getElementById('task-input');
    const taskDeadline = document.getElementById('task-input-deadline');
    const taskTimeEstimate = document.getElementById('task-input-estimated-time');

    if (taskName.value !== '') {
        // Create a new list item
        // const newTask = document.createElement('li');
        // newTask.textContent = taskName.value + ", " + taskDeadline.value + ", " + taskTimeEstimate.value;

        // // Add the new task to the list
        // taskList.appendChild(newTask);
        createNewTaskEntry(taskName.value, taskDeadline.value, taskTimeEstimate.value);  

        // Clear the input field
        taskName.value = '';
        taskDeadline.value = '';
        taskTimeEstimate.value = '';
    }
}

function createNewTaskEntry(taskName, taskDeadline, taskTimeEstimate) {
    const taskList = document.getElementById('task-list');
    const newTask = document.createElement('li');


    newTask.textContent = taskName + ", " + taskDeadline + ", " + taskTimeEstimate;

    // Add the new task to the list
    taskList.appendChild(newTask);

}