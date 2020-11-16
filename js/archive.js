// Variables
let archiveData = [];
let archiveStatistics = [];

// Initializes the archive.
function initalizeArchive()
{
	for (let i = 0; i < 12; i++)
	{
		if (localStorage.getItem(time.months[i].name))
		{
			// Setup archive data.
			archiveData[i] = new Dataset(new Date(todaysDate.getFullYear(), (i + 1), 0));

			// Setup archive statistics.
			archiveStatistics[i] = { totalTime: '', averageTime: '', length: 31 }; // Highest score to set diagram table length???
		}
		else
		{
			archiveData[i] = null;
			archiveStatistics[i] = null;
		}
	}
} 
