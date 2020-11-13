class Task
{
	constructor(name, state)
	{
		this.name = name;
		this.state = state;
	}

	// Packs the object into a string
	pack()
	{
		return '#' + this.name + ':' + this.state;
	}
}

// Variables
let taskList = [];
const taskListLimit = 8;
let selectedTask = -1;
let hoverIndex = -1;

// Loads tasks into the array.
function loadTaskList()
{
	// Check if tasks item already exists
	if (localStorage.getItem('Tasks'))
	{
		let result = localStorage.getItem('Tasks').split('#');

		for (let i = 1; i < result.length; i++)
		{
			let package = result[i].split(':');
			taskList.push(new Task(package[0], (package[1] == 'true')));
		}
	}
}

// Saves tasks from the array to local storage.
function saveTaskList()
{
	let result = '';
	for (let i = 0; i < taskList.length; i++)
	{
		result += taskList[i].pack();
	}

	// Set localstorage data.
	localStorage.setItem('Tasks', result);
}

// Gets tasks
function getTasks()
{
	let result = '';

	for (let i = 0; i < taskList.length; i++)
	{
		result += getTaskButton(i);
	}

	return result;
}

// Adds a template task to the array.
function addTask()
{
	if (taskList.length != taskListLimit)
	{
		taskList.push(new Task('New task', true));
	}

	drawView();
}

// Moves the task object within the array up or down.
function moveTask(delta)
{
	// Guard clause; within array boundaries.
	if (!mathf.withinRange(selectedTask + delta, 0, taskList.length -1)) return;

	// Switch from one spot to the other.
	let toReplace = taskList[selectedTask + delta];
	taskList[selectedTask + delta] = taskList[selectedTask];
	taskList[selectedTask] = toReplace;

	// Increase selected task index and draw view.
	selectedTask += delta;
	drawView();
}

// Removes the task from the array
function removeTask(index)
{
	taskList.splice(index, 1);
	selectedTask = -1;
	drawView();
}

// Updates a task
function updateTask()
{
	// Invert task state.
	taskList[selectedTask].state = !taskList[selectedTask].state;
	drawView();
}

// On task selection
function selectTask(index)
{
	if (selectedTask != index)
	{
		// If previously selected task was not none.
		if (selectedTask != -1)
		{
			if (emptyStringCheck()) removeTask(selectedTask);
		}

		selectedTask = index;
	}

	drawView();
}

// On task deselection
function deselectTask()
{
	if (emptyStringCheck()) removeTask(selectedTask);
	selectedTask = -1;
	drawView();
}

function emptyStringCheck()
{
	// Remove all empty spaces.
	let newString = taskList[selectedTask].name.replaceAll(' ', '');
	return (newString == '');
}