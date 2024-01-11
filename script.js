function addTask() {
    const taskName = document.getElementById('task-input');
    const taskDeadline = document.getElementById('task-input-deadline');
    const taskTimeEstimate = document.getElementById('task-input-estimated-time');

    const taskList = document.getElementById('task-list');

    if (taskName.value !== '') {
        // Create a new list item
        const newTask = document.createElement('li');
        newTask.textContent = taskName.value + ", " + taskDeadline.value + ", " + taskTimeEstimate.value;

        // Add the new task to the list
        taskList.appendChild(newTask);

        // Clear the input field
        taskInput.value = '';
    }
}
