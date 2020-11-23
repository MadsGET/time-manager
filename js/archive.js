// Variables
let diagramData = [];
let archivePages = [];
let archiveIndex = 0;

class DiagramData
{
	constructor(date)
	{
		this.key = time.months[date.getMonth()].name;
		this.items = [];
		this.totalTime = 0;
		this.highestTime = 0;

		// Loop through value array and setup to month size.
		for (let i = 0; i < date.getDate(); i++)
		{
			this.items[i] = null;
		}

		// Fetch stored dataset.
		let storedData = localStorage.getItem(this.key).split(' ');

		// Loop through each dataset, unpack and add to array.
		for (let data of storedData)
		{
			// Guard clause; If empty.
			if (data == '') return;

			// Data unpacking references.
			const day = parseInt(data.slice(0, 2));
			const hours = parseInt(data.slice(3, 5));
			const minutes = parseInt(data.slice(5, 7));

			// Calculate the total value of hours and minutes.
			const dataValue = hours + parseFloat((minutes / 60).toFixed(1));

			// Set data within items.
			this.items[day-1] = dataValue;

			// Add value to total and average time.
			this.totalTime += dataValue;

			// Set highest time value.
			if (this.highestTime < dataValue) this.highestTime = Math.round(dataValue);
		}
	}
}

// Initializes the archive.
function initalizeArchive() // Live update???
{
	for (let i = 0; i < 12; i++)
	{
		if (localStorage.getItem(time.months[i].name))
		{
			// Setup date for dataset.
			let datasetDate = new Date(todaysDate.getFullYear(), (i + 1), 0);

			// Setup archive data.
			diagramData[i] = new DiagramData(datasetDate);

			// Setup archive pages.
			archivePages.push({ name: time.months[i].name, reference: i });

			// Set archive index.
			archiveIndex = archivePages.length - 1;
		}
		else
		{
			// Event of there being no data???
			diagramData[i] = null;
		}
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
function drawPillars(index, length, widthModifier, heightModifier, hoverInfo)
{
	// How much space each pillar is assigned.
	const fillValue = 91.5 / length;

	// Max pillar height.
	const maxHeight = 1;
	const minHeight = 98;
	const lesserHeight = minHeight * heightModifier;
	const greaterHeight = minHeight * (1 - heightModifier);

	// Colors
	const pillarColor = `rgba(255, 255, 255, ${mathf.clamp(1 - heightModifier, 0.05, 0.5)}`;
	const isCurrentDay = (archivePages[archiveIndex].name == dataset.key && index == todaysDate.getDate() - 1);

	// Calculated pillar width, and calculated leftover.
	const leftover = fillValue * (1 - widthModifier) / 2;

	// Start position in x axis.
	const xStartPos = leftover + 8.5;

	// Calculated x position for each pillar.
	const xPos = xStartPos + fillValue * index;

	// Does not draw anything if no data is parsed.
	return (greaterHeight != 0) ? `
		<rect x="${xPos}%" y="${maxHeight + lesserHeight}%" width="${fillValue * widthModifier}%" height="${greaterHeight}%" style="fill:${(isCurrentDay) ? 'snow' : pillarColor}"; user-select:all;">
			<title>${hoverInfo}</title>
		</rect>
	` : '';
}
