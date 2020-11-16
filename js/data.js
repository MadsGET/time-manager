const iconPlay = '<small>&#9654;</small>';
const iconPause = '<small>&#x23F9;</small>';

function getMenu(pageName)
{
	return `
		<div class="menu"> 
			<div style="grid-area:buttonL; align-items:center; display: flex;">
				<div class="roundedButton" style="background-image: var(--iconArrowLeft);" onClick="onPageChange(-1);"></div>
			</div>
			<div class="overviewText">
				<h1 style="margin:auto; font-size:225%;">
					${pageName}
				</h1>
			</div>
			<div style="grid-area:buttonR; align-items:center; display: flex;">
				<div class="roundedButton" style="background-image: var(--iconArrowRight);" onClick="onPageChange(+1);"></div>
			</div>
		</div>
	`;
}

function getContent(contentName)
{
	if (contentName == 'Home') {
		return `
			<div class="tracker">
				<div id="clock" class="clock" style="margin-bottom:0; font-size:450%;">
					2:36pm
				</div>
				<div id="timer" class="timer" style="margin-top:0; font-size:250%;" onclick="toggleSession();">
					 	+00:00:00 <small>&#9654;</small>
				</div>
			</div>
		`;
	}
	else if (contentName == 'Tasks')
	{
		return `
			<div class="taskArea" onmouseleave="hoverIndex =-1; drawView();">
				<div style="grid-area:taskHeader; border-bottom: calc(var(--borderSize) * 2.25) solid;">
					<div style="width:100%; font-size:200%; margin:0; text-align:center;">${time.days[todaysDate.getDay() - 1].name}</div>
				</div>

				<div class="taskContent">
					${getTasks()}
				</div>

				<div class="taskFooter" style="grid-area:taskFooter; border-top: calc(var(--borderSize) * 2.25) solid;">
				${(selectedTask != -1) ? `<div class="defaultButton" onclick="updateTask()"> Mark task </div>` : ''}
				<div class="defaultButton" ${(taskList.length == taskListLimit) ? 'style="background-color:rgba(0, 0, 0, 0.25);"': ''} onclick="addTask()"> New task </div>
				${(selectedTask != -1) ? `<div class="defaultButton" onclick="removeTask(selectedTask)"> Delete task </div>` : ''}
				</div>
			</div>
		`;
	}
}

function getTaskButton(index)
{
	// References
	let taskActive = taskList[index].state;

	if (index != selectedTask)
	{ 
		let hoverCondition = (hoverIndex == index && selectedTask == -1);
		let deleteTool = `<div class="taskButton" style="height:100%; width:100%; background-size:60% 60%; background-image: var(--iconDelete);" onClick="removeTask(${index});"></div>`;
		let openTool = `<div class="taskButton" style="height:100%; width:100%; background-size:60% 60%; background-image: var(--iconOpen);" onClick="selectTask(${index});"></div>`;

		return `
			<div class="task ${(hoverCondition) ? 'taskHover' : ''}" onmouseover="hoverIndex =${index}; drawView();">
				<div class="taskTool">
					${(hoverCondition) ? deleteTool : ''}
				</div>
				<div class="taskName">
					${(taskActive) ? taskList[index].name : '<del>' + taskList[index].name + '<del>'}
				</div>
				<div class="taskTool">
					${(hoverCondition) ? openTool : ''}
				</div>
			</div>
		`;
	}

	return `
		<div class="task selectedTask">
			<div class="taskTool">
				<div class="taskButton" style="height:100%; width:100%; background-size:60% 60%; background-image: var(--iconCheckmark);" onClick="deselectTask();"></div>
			</div>
			<input class="taskName taskNameInput" id="inputfield" style="${(!taskActive) ? 'text-decoration:line-through;' : ''}" type="text" value="${taskList[index].name}" onChange="taskList[${index}].name = this.value">

			</input>
			<div class="taskTool" style="grid-template-areas: 'taskButton' 'taskButton'; display:grid;">
				<div class="taskButton" style="background-image: var(--iconArrowUp);" onclick="moveTask(-1)"></div>
				<div class="taskButton" style="background-image: var(--iconArrowDown);" onclick="moveTask(+1)"></div>
			</div>
		</div>
	`;
}
