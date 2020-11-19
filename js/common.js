// When page is first loaded.
window.onload = function onPageLoaded()
{
	// Set reference to the application element.
	application = document.getElementById('application');

	// Initilize task list data.
	loadTaskList();

	// Initilize storage and archive data.
	initializeStorage(todaysDate);
	initalizeArchive();

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

	/* BUGS RELATED TO SAVING AND COUNTING WHEN TAB IS NOT ACTIVE HAPPENS.
	   Probably caused by github, but unsure. Safest way to test app is locally.
	   Possibly on lost page focus that we have calculate timer differently. */

	// Overwrite stored dataset.
	dataset.overwrite();

	// Set return value.
	event.returnValue = 'no-value';
}