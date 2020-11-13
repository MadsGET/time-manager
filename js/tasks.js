class Task
{
	constructor(name, state)
	{
		this.name = name;
		this.state = state;
	}
}

let selectedTask = -1;
let taskList =[];

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
	taskList.push(new Task('New task', true));
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
function removeTask()
{
	taskList.splice(selectedTask, 1);
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
			if (emptyStringCheck()) removeTask();
		}

		selectedTask = index;
	}

	drawView();
}

// On task deselection
function deselectTask()
{
	if (emptyStringCheck()) removeTask();
	selectedTask = -1;
	drawView();
}

function emptyStringCheck()
{
	// Remove all empty spaces.
	let newString = taskList[selectedTask].name.replaceAll(' ', '');
	return (newString == '');
}