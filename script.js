
counter = 0; 
let json_data; 

function addTask() {
    const taskName = document.getElementById('task-input');
    const taskDeadline = document.getElementById('task-input-deadline');
    const taskTimeEstimate = document.getElementById('task-input-estimated-time');

    if (taskName.value !== '') {
        // Create a new list item
        createNewTaskEntry(taskName.value, taskDeadline.value, taskTimeEstimate.value, true);  

        // Clear the input field
        taskName.value = '';
        taskDeadline.value = '';
        taskTimeEstimate.value = '';
    }
}

function createNewTaskEntry(taskName, taskDeadline, taskTimeEstimate, isNewEntry) {
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
    
    if (isNewEntry){
        json_data.push({
            title: taskName, 
            detail: taskDeadline, 
            time_estimate: taskTimeEstimate
        }); 
    }
}


// When page is reloading or exiting, store the data as json string

function onPageExitOrRefresh(event) {
    let json_str = JSON.stringify(json_data); 
    localStorage.setItem("json_data", json_str); 
}

window.addEventListener('beforeunload', onPageExitOrRefresh);

// When page is first loaded, show the stored data as entries on the page
function onPageLoad() {
    let json_str = localStorage.getItem('json_data');

    json_data = JSON.parse(json_str);
    if (json_data == null) {
        json_data = []; 
    }
    console.log(json_data);

    for (const entry of json_data) {
        createNewTaskEntry(entry['title'], entry['detail'], entry['time_estimate'], false); 
    }
}

window.onload = onPageLoad; 

// reset data when clicked on the footer 
function resetData() {
    json_data = []; 
    let json_str = JSON.stringify(json_data); 
    localStorage.setItem("json_data", json_str); 

    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

}
