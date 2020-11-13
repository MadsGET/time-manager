// When page is first loaded.
window.onload = function onPageLoaded()
{
	// Set reference to the application element.
	application = document.getElementById('application');

	// Initilize task list data.
	loadTaskList();

	// Initilize storage data.
	initializeStorage(todaysDate);

	// Initialize routine with tick equal to stored data.
	if (dataset.items[dataIndex].seconds != 0) routineTick = dataset.items[dataIndex].seconds;
	
	// Draw view, timer and clock.
	drawView();
	drawTimer();
	drawClock();

	// Starts the page routine.
	setInterval(updateRoutine, 1000);
}

// When a page is changed.
function onPageChange(delta)
{
	// Is the new index position within the boundaries of the array?
	if ((pageIndex + delta) >= 0 && (pageIndex + delta) < pages.length)
	{
		// Increase page delta.
		pageIndex += delta;

		// Deselect task selection.
		if (selectedTask != -1)
		{
			if (emptyStringCheck()) removeTask();
			selectedTask = -1;
		}

		// Draw view.
		drawView();

		if (pageIndex == 0)
		{
			// Draw clock and timer.
			drawClock();
			drawTimer();
		}
	}
}

// When the page is closed.
window.onbeforeunload = function onPageClosed(event)
{
	// Overwrite stored tasklist dataset.
	saveTaskList();

	// Overwrite stored dataset if session is active.
	if (sessionActive) dataset.overwrite();

	// Set return value.
	event.returnValue = 'no-value';
}