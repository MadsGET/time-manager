// Routine
let routineTick = 0;		// Tick per update rate.

// Realtime
let lastRecordedHour = todaysDate.getHours();

function updateRoutine()
{
	/* Realtime */

	// Create a new date object.
	let newDate = new Date();

	// If a new realtime hour has begun.
	if (lastRecordedHour != newDate.getHours())
	{
		// Set last recorded hour
		lastRecordedHour = newDate.getHours();

		// Overwrite changes to stored dataset.
		dataset.overwrite();

		// Update todays date.
		todaysDate = newDate;

		// Re-initalize storage.
		initializeStorage(newDate);
	}

	// Draw the clock.
	drawClock();

	/* Routine */

	// Guard clause; session is not active.
	if(!sessionActive) return; 

	// Increase or reset tick counter.
	(routineTick == 59) ? routineTick = 0 : routineTick++;

	// When a new minute begins.
	if (routineTick == 0)
	{
		// Get stored hours in minutes, and stored minutes.
		let storedHours = dataset.items[dataIndex].hours / 60;
		let storedMinutes = dataset.items[dataIndex].minutes;

		// Convert the stored data into a hours and minutes count.
		let result = time.convertMinutes(storedHours + storedMinutes + 1);

		// Replace old data with new data.
		dataset.items[dataIndex].hours = result.hours;
		dataset.items[dataIndex].minutes = result.minutes;
		dataset.items[dataIndex].seconds = 0;

		// Overwrite stored dataset.
		dataset.overwrite();
	}
	
	// Add seconds to subdata.
	dataset.items[dataIndex].seconds = routineTick;

	// Draw the timer.
	drawTimer();
}