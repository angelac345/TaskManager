function addTask() {
    const taskName = document.getElementById('task-input');
    const taskDeadline = document.getElementById('task-input-deadline');
    const taskTimeEstimate = document.getElementById('task-input-estimated-time');

    if (taskName.value !== '') {
        // Create a new list item
        createNewTaskEntry(taskName.value, taskDeadline.value, taskTimeEstimate.value);  

        // Clear the input field
        taskName.value = '';
        taskDeadline.value = '';
        taskTimeEstimate.value = '';
    }
}

function createNewTaskEntry(taskName, taskDeadline, taskTimeEstimate) {
    const taskList = document.getElementById('task-list');
    // const newTask = document.createElement('div'); 
    // Create the hbox container
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.id = 'task-item'; 

    // Create the left box
    const taskTitle = document.createElement('div');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = taskName;

    // Create the right box
    const taskDetail = document.createElement('div');
    taskDetail.classList.add('task-detail');

    // Create the task-item inside the right box
    const hbox = document.createElement('div');
    hbox.classList.add('hbox');

    // Add items to the task-item
    const items = [taskDeadline, taskTimeEstimate];
    items.forEach(itemText => {
        const hboxItem = document.createElement('div');
        hboxItem.classList.add('hbox-item');
        hboxItem.textContent = itemText;
        hbox.appendChild(hboxItem);
    });

    // Append left box, right box (with task-item), and hbox to the body
    taskDetail.appendChild(hbox);
    taskItem.appendChild(taskTitle);
    taskItem.appendChild(taskDetail);

    taskList.appendChild(taskItem);
    
}