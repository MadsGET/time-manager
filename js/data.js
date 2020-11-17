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
		// Reference to statistics object.
		const statistics = archiveStatistics[archivePages[archivePagesIndex].reference];
		const data = archiveData[archivePages[archivePagesIndex].reference];

		let hourLines = '';
		for (let i = 0; i < statistics.highestValue; i++) // CLAMP BETWEEN 8, 16.
		{
			// Always draws an unused line.
			hourLines += drawHourLines(i, statistics.highestValue);
		}

		let pillars = '';
		for (let x = 0; x < statistics.length; x++)
		{
			pillars += drawPillars(x, statistics.length, 0.75, 0.1); // Clamp minimum fill length
		}

		const buttonStyle = `
			height:85%;
			margin-bottom:0;
			width:5%; 
			background-size:50% 50%;
		`;

		return `

			<div class="archiveArea" viewBox="0 0 100 100" preserveAspectRation="none">
				<div class="archiveHeader">
					<div class="triangleButton" style="${buttonStyle} margin-right:0; background-image:var(--iconTriangleL);"></div>
					<div class="archiveHeading">${data.key}</div>
					<div class="triangleButton" style="${buttonStyle} margin-left:0; background-image:var(--iconTriangleR);"></div>
				</div>
				<svg class="archiveContent">
					<line class="svgLine" x1="0" y1="0.5%" x2="100%" y2="0.5%"/>
					<line class="svgLine" x1="8%" y1="0.5%" x2="8%" y2="99.5%"/>
					<line class="svgLine" x1="0" y1="99.5%" x2="100%" y2="99.5%"/>
					${hourLines}
					${pillars}
				</svg>				
				<div class="archiveFooter">
					<div class="statistics" style="text-align:left;">Total time: 56.5 hours</div>
					<div class="statistics" style="text-align:right;">Average time: 6.5 hours</div>
				</div>
			</div>
		`;
	}
}

function drawHourLines(index, length)
{
	// How much space each element is assigned.
	let fillValue = 99 / length;
	let thisElementFillValue = fillValue * index;
	let textElementValue = (fillValue * 0.7) + fillValue * index;
	let textCenterValue = (length - index >= 10) ? '2.75' : '3.5';

	return `
		<text x="${textCenterValue}%" y="${textElementValue}%" fill="snow" style="font-size:2vmin">${(length - index)}</text>
		<line class="svgLineFaint" x1="0" y1="${thisElementFillValue}%" x2="100%" y2="${thisElementFillValue}%"/>
	`;
}

// Takes in and index for current, length for array. With as modifier (ex: 0.5)
function drawPillars(index, length, widthModifier, heightModifier)
{
	// How much space each pillar is assigned.
	const fillValue = 91.5 / length;

	// Max pillar height.
	const maxHeight = 90.5;
	const lesserHeight = maxHeight * heightModifier;
	const greaterHeight = maxHeight * (1 - heightModifier);

	// Calculated pillar width, and calculated leftover.
	const leftover = fillValue * (1 - widthModifier) / 2;

	// Start position in x axis.
	const xStartPos = leftover + 8.5;

	// Calculated x position for each pillar.
	const xPos = xStartPos + fillValue * index;

	return `
		<rect x="${xPos}%" y="${8.75 + lesserHeight}%" width="${fillValue * widthModifier}%" height="${greaterHeight}%" style="fill:rgba(255, 255, 255, 0.3);" />
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
