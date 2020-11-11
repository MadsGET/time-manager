// Session data
let dataset = null;
let dataIndex = -1;
let sessionActive = false;

// Class for data set
class Dataset
{
	constructor(date)
	{
		// Generate date, key and items.
		this.key = time.months[date.getMonth()].name;
		this.items = [];

		// Fetch stored dataset.
		let storedData = localStorage.getItem(this.key);

		// If stored data is not empty.
		if (storedData != null) {

			// Decompiled object.
			storedData = storedData.split(' ');

			// Replace each string with an object.
			for (let i = 0; i < storedData.length; i++)
			{
				// Create new subdata if its value is not empty.
				if (storedData[i] != '') this.items.push(new Subdata(storedData[i]));
			}
		}
		else
		{
			// Create a storage object.
			localStorage.setItem(this.key, '');
		}
	}

	// Creates a default new item to array.
	newItem(date)
	{
		this.items.push(new Subdata(time.formatNumber(date.getDate()) + '#000000 '));
	}

	// Fetches the index of a key.
	fetchIndex(key)
	{
		for (let i = 0; i < this.items.length; i++)
		{
			if (this.items[i].day == key) return i;
		} 

		return -1;
	}

	// Overwrites stored data with current dataset.
	overwrite()
	{
		// To store the string.
		let newItems = '';

		// Pack each subdata object into new items string.
		for (let i = 0; i < this.items.length; i++)
		{
			newItems += this.items[i].pack();
		}

		// Set the new items.
		localStorage.setItem(this.key, newItems);
	}
}

class Subdata
{
	constructor(string)
	{
		this.day = parseInt(string.slice(0, 2));
		this.hours = parseInt(string.slice(3, 5));
		this.minutes = parseInt(string.slice(5, 7));
		this.seconds = parseInt(string.slice(7, 9));
	}

	// Packs the object as a string.
	pack()
	{
		let dayString = time.formatNumber(this.day);
		let hoursString = time.formatNumber(this.hours);
		let minutesString = time.formatNumber(this.minutes);
		let secondsString = time.formatNumber(this.seconds);

		return dayString + '#' + hoursString + minutesString + secondsString + ' ';
	}

	// Returns a display string.
	display()
	{
		return time.formatNumber(this.hours) + ':' + time.formatNumber(this.minutes) + ':' + time.formatNumber(this.seconds);
	}
}

// Perform startup checks and initilization.
function initializeStorage(date)
{
	// Fetch year data.
	let yearData = localStorage.getItem('Year');

	// Is year data empty or not matching?
	if (yearData == null || yearData != date.getFullYear())
	{
		// Clear old data and set new year tag.
		localStorage.clear();
		yearData = localStorage.setItem('Year', date.getFullYear());
	}

	// Generate a new or import stored dataset.
	dataset = new Dataset(date);

	// Does a value exist for today?
	dataIndex = dataset.fetchIndex(date.getDate());

	// If the data index is invalid.
	if (dataIndex == -1)
	{
		// Create a new object for today.
		dataset.newItem(todaysDate);

		// Set index to max.
		dataIndex = dataset.items.length - 1;

		// Compile new dataset and store it.
		dataset.overwrite();
	}
}

// Toggles sessions active state
function toggleSession()
{
	// Invert session active state.
	sessionActive = !sessionActive;

	// If session is inactive; save the current dataset.
	if (!sessionActive) dataset.overwrite(); drawTimer();
}