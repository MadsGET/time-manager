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
		// Reference to the diagram object.
		const diagramObject = diagramData[archivePages[archiveIndex].reference];

		// Hour line and text setup.
		let hourLines = '';
		let hourValue = mathf.clamp(diagramObject.highestTime + 1, 8, 16);
		for (let i = 0; i < hourValue; i++)
		{
			// Always draws an unused line.
			hourLines += drawHourLines(i, hourValue);
		}

		// Reference values for pillar setup.
		let pillars = '';
		let widthValue = 0.75;

		// Loop through each dataset and create a pillar.
		for (let x = 0; x < diagramObject.items.length; x++)
		{
			// Guard clause; on empty value.
			if (diagramObject.items[x] == null || diagramObject.items[x] == '') continue;

			// Setup length modifier and on hover info.
			let lengthModifier = 1 - (diagramObject.items[x] / hourValue);
			let hoverInfo = `Day ${time.formatNumber(x)} lasted: ${diagramObject.items[x]} hour(s)`;

			// Add generated SVG code to pillars variable.
			pillars += drawPillars(x, diagramObject.items.length, widthValue, lengthModifier, hoverInfo);
		}

		// Buttons
		const buttonStyle = `
			height:85%;
			margin-bottom:0;
			width:5%; 
			background-size:50% 50%;
		`;

		const buttonLStyle = `margin-right:0; background-image:var(--iconTriangleL);`;
		const buttonRStyle = `margin-left:0; background-image:var(--iconTriangleR);`;

		const displayButtons = (archivePages.length == 1);
		const buttonL = `<div class="triangleButton" style="${buttonStyle} ${buttonLStyle}" onclick="archiveIndex = mathf.boundaryLimit(archiveIndex -1, archivePages.length-1, false); drawView();"></div>`;
		const buttonR = `<div class="triangleButton" style="${buttonStyle} ${buttonRStyle}" onclick="archiveIndex = mathf.boundaryLimit(archiveIndex +1, archivePages.length-1, false); drawView();"></div>`;

		// Statistics
		const averageTime = (diagramObject.totalTime / diagramObject.items.length).toFixed(1);
		const statisticsL = `<div class="statistics" style="text-align:left;">Total time: ${diagramObject.totalTime} hours</div>`;
		const statisticsR = `<div class="statistics" style="text-align:right;">Average time: ${averageTime} hours</div>`;

		return `

			<div class="archiveArea" viewBox="0 0 100 100" preserveAspectRation="none">
				<div class="archiveHeader">
					${(displayButtons) ? '' : buttonL}
					<div ${(displayButtons) ? '' : 'style="margin-left:0; margin-right:0;"'} class="archiveHeading">${diagramObject.key}</div>
					${(displayButtons) ? '' : buttonR}
				</div>
				<svg class="archiveContent">
					<line class="svgLine" x1="0" y1="0.5%" x2="100%" y2="0.5%"/>
					<line class="svgLine" x1="8%" y1="0.5%" x2="8%" y2="99.5%"/>
					<line class="svgLine" x1="0" y1="99.5%" x2="100%" y2="99.5%"/>
					${hourLines}
					${pillars}
				</svg>				
				<div class="archiveFooter">
					${statisticsL}
					${statisticsR}
				</div>
			</div>
		`;
	}
}
