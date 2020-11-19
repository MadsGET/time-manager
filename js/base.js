// Model
const pages = ['Home', 'Tasks', 'Overview'];
let pageIndex = 0;

// References
let todaysDate = new Date();
let application = null;

// View
function drawView()
{
	application.innerHTML = `
		<div class="page panel" style="border: var(--borderColor) var(--borderSize) solid;">
				${getMenu(pages[pageIndex])}
			<div class="contentArea">
				${getContent(pages[pageIndex])}
			</div>
		</div>
	`;

	// Event references
	let inputfield = document.getElementById('inputfield');

	// Events
	if (inputfield != null)
	{
		inputfield.addEventListener('keyup', function (event)
		{
			if (event.keyCode == 13)
			{
				deselectTask();
			}
		});
	}

	console.log('draw call');
}

// Timer view
function drawTimer()
{
	// Guard clause; Current page is not home.
	if (pageIndex != 0) return;

	let suffix = (sessionActive) ? iconPause : iconPlay;
	document.getElementById('timer').innerHTML = '+' + dataset.items[dataIndex].display() + suffix;
}

// Clock view
function drawClock()
{
	// Guard clause; Current page is not home.
	if (pageIndex != 0) return;

	// Set time
	document.getElementById('clock').innerText = time.createAnalogTimeString();
}