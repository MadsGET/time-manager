class Task
{
	constructor(name, state)
	{
		this.name = name;
		this.state = state;
	}
}

let selectedTask = -1;
let taskList =
[
	new Task('Write resume for job application', true),
	new Task('Send resume for job opening', true),
	new Task('Create graphical art', true),
];

function getTasks()
{
	let result = '';

	for (let i = 0; i < taskList.length; i++)
	{
		result += `<input class="task" type="text" value="${taskList[i].name}" onclick="selectedTask=${i}; drawView();"></input>`;
	}

	return result;
}

function addTask()
{
	taskList.push(new Task('New task', true));
	drawView();
}