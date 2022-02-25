let taskWrapper = document.getElementById('task-wrapper');
const nameInput = document.getElementById('name-input');
const dateInput = document.getElementById('date-input');
const statusInput = document.getElementById('status-input');
const addTaskBtn = document.getElementById('add-btn');
let filterByDateController = document.getElementById('filter-by-date');
let filterByStatusController = document.getElementById('filter-by-status');
let sortByController = document.getElementById('sort-by');
let editName = document.getElementById('edit-name');
let editDate = document.getElementById('edit-date');
let saveButton = document.getElementById('save');
let currentIdForEdit = 0;

// apeend new task in taskwrapper element
let toDoTasks = [];
let idCounter = 0;

addTaskBtn.addEventListener('click', appendTaskList);

function appendTaskList() {
	let data = getValuesFromInputs();
	if (data.name !== '' && data.date != '') {
		toDoTasks.push(data);
		let newTask = createTaskElement(data);

		taskWrapper.appendChild(newTask);
		resetInputFields();
	}
}
function getValuesFromInputs() {
	idCounter++;
	return {
		name: nameInput.value,
		date: dateInput.value,
		status: statusInput.checked == true ? 'true' : 'false',
		id: idCounter,
	};
}

function resetInputFields() {
	nameInput.value = '';
	dateInput.value = '';
	statusInput.checked = false;
}

function addEventListenerToDeleteBtn() {
	let btnsArr = Array.from(document.querySelectorAll('.delete-task'));
	btnsArr.forEach((btn) => {
		btn.addEventListener('click', deleteTask);
	});
}

function deleteTask(e) {
	let id = +e.target.parentElement.parentElement.id;
	let newArr = toDoTasks.filter((item) => item.id !== id);

	updateTaskListOnChange(newArr);
	renderToDoItems(newArr);
}

function updateTaskListOnChange(array) {
	toDoTasks = array;
}

function renderToDoItems(arr) {
	taskWrapper.innerHTML = '';
	arr.forEach((task) => {
		let newTask = createTaskElement(task);
		taskWrapper.appendChild(newTask);
	});

	addEventListenerToDeleteBtn();
	resetInputFields();
}

function createTaskElement(data) {
	let newTask = document.createElement('div');
	newTask.classList.add('single-task');
	newTask.setAttribute('id', data.id);
	newTask.innerHTML = `
						<label class="checkmark-container">
							<p>${data.status}</p>
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
	return newTask;
}

// filters

//filter by date
filterToDoOnDateChange();
filterToDoByStatus();

function filterToDoOnDateChange() {
	let date = '';
	filterByDateController.addEventListener('change', (e) => {
		if (e.target.value == '') {
			renderToDoItems(toDoTasks);
			return;
		}
		date = e.target.value;
		updateDateFilteredArr(date);
		return date;
	});
}

function updateDateFilteredArr(date) {
	let filteredDateArr = toDoTasks.filter((todo) => todo.date == date);
	renderToDoItems(filteredDateArr);
}

function filterToDoByStatus() {
	filterByStatusController.addEventListener('change', filterListByStatus);
}

function filterListByStatus(e) {
	let status = e.target.value;
	let filteredStatusArr = toDoTasks.filter((todo) => todo.status == status);
	if (status == 'all') {
		renderToDoItems(toDoTasks);
		return;
	}
	renderToDoItems(filteredStatusArr);
}

// Sorting elements

sortByController.addEventListener('change', (e) => {
	if (e.target.value == 'name') {
		sortByName(toDoTasks);
	} else if (e.target.value == 'date') {
		sortByDate(toDoTasks);
	} else if (e.target.value == 'status') {
		sortByStatus(toDoTasks);
	}
});

function sortByName(obj) {
	let toArray = Object.values(obj);
	let sortedByName = [...toArray].sort((a, b) => a.name.localeCompare(b.name));
	renderToDoItems(sortedByName);
}

function sortByDate(obj) {
	let toArray = Object.values(obj);
	let sortedByName = [...toArray].sort((a, b) => a.date.localeCompare(b.date));
	renderToDoItems(sortedByName);
}
function sortByStatus(obj) {
	let toArray = Object.values(obj);
	let sortedByName = [...toArray].sort((a, b) =>
		b.status.localeCompare(a.status)
	);
	renderToDoItems(sortedByName);
}
