function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    if (taskInput.value !== '') {
        // Create a new list item
        const newTask = document.createElement('li');
        newTask.textContent = taskInput.value;

        // Add the new task to the list
        taskList.appendChild(newTask);

        // Clear the input field
        taskInput.value = '';
    }
}
