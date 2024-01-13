
let counter; 
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
    counter = counter + 1; 
    const taskList = document.getElementById('task-list');
    // const newTask = document.createElement('div'); 
    const taskItemLarge = document.createElement('div'); 
    taskItemLarge.classList.add('task-item-large'); 
    taskItemLarge.id = 'task-item-'+counter; 

    const numbering = document.createElement('p'); 
    numbering.textContent = counter;
    numbering.classList.add('task-numbering'); 
    numbering.id = 'task-numbering-'+counter;

    // Create the vbox container
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.id = 'task-item'; 

    // Create the top box
    const topBox = document.createElement('div'); 
    topBox.classList.add('task-top-box'); 

    const taskTitle = document.createElement('div');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = taskName;

    const delButton = document.createElement('button')
    delButton.classList.add('del-button'); 
    delButton.dataset.number = counter; 
    delButton.textContent = 'Delete Task'; 
    delButton.addEventListener('click', handleDeleteTask);

    topBox.appendChild(taskTitle); 
    topBox.appendChild(delButton); 

    // Create the bottom box
    const taskDetail = document.createElement('div');
    taskDetail.classList.add('task-detail');

    // Create the task-item inside the bottom box
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
    taskItem.appendChild(topBox);
    taskItem.appendChild(taskDetail);

    taskItemLarge.appendChild(numbering);
    taskItemLarge.appendChild(taskItem); 
    taskList.appendChild(taskItemLarge);
    
    if (isNewEntry){
        json_data.push({
            title: taskName, 
            detail: taskDeadline, 
            time_estimate: taskTimeEstimate, 
            counter: counter
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
    counter = 0; 

    json_data = JSON.parse(json_str);
    if (json_data == null) {
        json_data = []; 
    }

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


// delete task 
function handleDeleteTask(event) {
    console.log(json_data); 
    let taskIndex = event.target.dataset.number - 1;
    
    json_data.splice(taskIndex, 1); 
    
    for (var i = taskIndex; i < json_data.length; i += 1) {
        let origNumber = json_data[i]['counter']; 

        json_data[i]['counter'] = i + 1; 
        
        document.getElementById('task-numbering-'+origNumber).textContent = (i+1); 
    }

    const taskBox = document.getElementById('task-item-'+event.target.dataset.number);
    taskBox.parentNode.removeChild(taskBox); 

    console.log(json_data);
    counter = counter - 1; 
}
