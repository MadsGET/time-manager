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
			this.items[day] = dataValue;

			// Add value to total and average time.
			this.totalTime += dataValue;

			// Set highest time value.
			if (this.highestTime < dataValue) this.highestTime = dataValue;
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
			// Event of there being no data??? Execution to allow a day to be generated before this intilizations??
			diagramData[i] = null;
		}
	}
} 
