let taskWrapper = document.getElementById('task-wrapper');
const nameInput = document.getElementById('name-input');
const dateInput = document.getElementById('date-input');
const statusInput = document.getElementById('status-input');
const addTaskBtn = document.getElementById('add-btn');

// apeend new task in taskwrapper element

function getValuesFromInputs() {
	return {
		name: nameInput.value,
		date: dateInput.value,
		status: statusInput.checked,
	};
}
