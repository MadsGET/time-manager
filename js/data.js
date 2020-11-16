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
	else if (contentName == 'Tasks') {
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
				<div class="defaultButton" ${(taskList.length == taskListLimit) ? 'style="background-color:rgba(0, 0, 0, 0.25);"' : ''} onclick="addTask()"> New task </div>
				${(selectedTask != -1) ? `<div class="defaultButton" onclick="removeTask(selectedTask)"> Delete task </div>` : ''}
				</div>
			</div>
		`;
	}
	else
	{
		const topLine =			`<line class="svgLine" x1="0" y1="7.5%" x2="100%" y2="7.5%"/>`;
		const verticalLine =	`<line class="svgLine" x1="8.5%" y1="0" x2="8.5%" y2="99%"/>`;
		const bottomLine =		`<line class="svgLine" x1="0" y1="99%" x2="100%" y2="99%"/>`;

		let hourLines = '';
		for (let i = 0; i <12; i++)
		{
			// Always draws an unused line. (Might not be a problem)
			hourLines += drawHourLines(i);
		}

		let original = `<rect x="8.5%" y="7.5%" width="5%" height="91.5%" style="fill:rgb(255,255,255, 0.25);" />`;
		let pillars = '';
		let colorSwitch = false;
		let colors =['rgba(128, 0, 0, 0.75)', 'rgba(0, 0, 128, 0.75)']
		for (let x = 0; x < 16; x++)
		{
			pillars += drawPillars(x, 16, (colorSwitch) ? colors[0] : colors[1]);
			colorSwitch = !colorSwitch;
		}

		return `

			<div class="archiveArea" viewBox="0 0 100 100" preserveAspectRation="none">
				<svg>
					<text x="0.75%" y="5%" fill="snow">Hours</text>
					<text x="45%" y="5%" fill="snow" style="font-size:3vmin">November</text>
					${topLine}
					${verticalLine}
					${bottomLine}
					${hourLines}
					${pillars}
				</svg>				
			</div>
		`;
	}
}

function drawHourLines(index)
{
	// Math has a base value that is subtracted with movement value times index.
	const lineMath = 92 - (7.7 * index);
	const textMath = 97.5 - (7.7 * index);
	const textCentering = (index >= 9) ? '2.5' : '3.25';
	return `
		<text x="${textCentering}%" y="${textMath}%" fill="rgba(255, 255, 255, 0.75)"style="font-size:3vmin">${(index+1)}</text>
		<line class="svgLineFaint" x1="0" y1="${lineMath}%" x2="100%" y2="${lineMath}%"/>
	`;
}

function drawPillars(index, max, colors)
{
	// How much space each pillar is assigned.
	const fillValue = (91.5 / max);

	// Max pillar height.
	const maxHeight = 90.5;

	// Calculated pillar width, and calculated leftover.
	const pillarWidthModifier = 0.75;
	const leftover = fillValue * (1 - pillarWidthModifier) / 2;

	// Start position in x axis.
	const xStartPos = leftover + 8.5;

	// Calculated x position for each pillar.
	const xPos = xStartPos + fillValue * index;

	return `
		<rect x="${xPos}%" y="8%" width="${fillValue * pillarWidthModifier}%" height="${maxHeight}%" style="fill:${colors};" />
	`;
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
