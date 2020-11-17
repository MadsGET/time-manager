// Variables
let archiveData = [];
let archiveStatistics = [];
let archivePages = [];
let archivePagesIndex = 0;

class DiagramData
{
	constructor(date)
	{
		this.key = time.months[date.getMonth()].name;
		this.items = [];

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

			const day = parseInt(data.slice(0, 2));
			const hours = parseInt(data.slice(3, 5));
			const minutes = parseInt(data.slice(5, 7));

			// Set data within items.
			this.items[day] = hours + parseFloat((minutes / 60).toFixed(1));
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
			archiveData[i] = new DiagramData(datasetDate);

			// Setup arhive pages.
			archivePages.push({name: archiveData[i].key, reference: i});

			// Setup statistics variables.
			let totalTime = 0, averageTime = 0, leadingValue = 0;

			for (let x = 0; x < archiveData[i].items.length; x++)
			{
				// Setup item value as a floating point number with only one decimal.
				let hours = archiveData[i].items[x].hours;
				let minutes = archiveData[i].items[x].minutes;
				const itemValue = hours + parseFloat((minutes / 60).toFixed(1));

				// Add to total time.
				totalTime += itemValue;

				// Add to average.
				averageTime += itemValue;

				// Record highest value
				if (leadingValue < itemValue) leadingValue = itemValue;
			}

			// Set archive pages index.
			archivePagesIndex = (archivePages.length -1);

			// Calculate average time.
			averageTime = averageTime / archiveData[i].items.length;

			// Setup archive statistics.
			archiveStatistics[i] = { totalTime: totalTime, averageTime: averageTime, highestValue: Math.round(leadingValue), length: datasetDate.getDate() };
		}
		else
		{
			// Event of there being no data??? Execution to allow a day to be generated before this intilizations??
			archiveData[i] = null;
			archiveStatistics[i] = null;
		}
	}
} 
