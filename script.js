let taskWrapper = document.getElementById('task-wrapper');
const nameInput = document.getElementById('name-input');
const dateInput = document.getElementById('date-input');
const statusInput = document.getElementById('status-input');
const addTaskBtn = document.getElementById('add-btn');

// apeend new task in taskwrapper element

addTaskBtn.addEventListener('click', appendTaskList);

function appendTaskList() {
	let data = getValuesFromInputs();
	if (data.name !== '' && data.date != '') {
		let newTask = document.createElement('div');
		newTask.classList.add('single-task');
		newTask.innerHTML = `
                            <label class="checkmark-container">
                                <input type="checkbox" checked="${false}" />
                                <span class="checkmark"></span>
                            </label>
                            <div class="task-name">
                                <p>${data.name}</p>
                            </div>
                            <div class="task-date">
                                <p>${data.date}</p>
                            </div>
							<div class="task-date">
									<a href="#" class="edit-task">Edit</a>
									<a href="#" class="delete-task">Delete</a>
							</div>
        `;

		taskWrapper.appendChild(newTask);
		resetInputFields();
	}
}
function getValuesFromInputs() {
	return {
		name: nameInput.value,
		date: dateInput.value,
		status: statusInput.checked,
	};
}

function resetInputFields() {
	nameInput.value = '';
	dateInput.value = '';
	statusInput.checked = false;
}
