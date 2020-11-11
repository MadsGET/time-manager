const iconPlay = '<small>&#9654;</small>';
const iconPause = '<small>&#x23F9;</small>';

function getMenu(pageName)
{
	return `
		<div class="menu"> 
			<div style="grid-area:buttonL; align-items:center; display: flex;">
				<div class="button" style="background-image: var(--iconArrowLeft);" onClick="onPageChange(-1);"></div>
			</div>
			<div class="overviewText">
				<h1 style="margin:auto; font-size:225%;">
					${pageName}
				</h1>
			</div>
			<div style="grid-area:buttonR; align-items:center; display: flex;">
				<div class="button" style="background-image: var(--iconArrowRight);" onClick="onPageChange(+1);"></div>
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
	else if (contentName == 'Tasks')
	{
		return `
			<div class="taskArea">
				<div class="outline" style="grid-area:taskHeader; border-bottom: calc(var(--borderSize) * 2.25) solid;">
					<div style="width:100%; font-size:200%; margin:0; text-align:center;">Thursday</div>
				</div>

				<div style="grid-area:taskContent;">
					Write resume for job application <br>
					Send resume to job opening<br>
					Create graphical art
				</div>

				<div class="outline" style="grid-area:taskFooter; border-top: calc(var(--borderSize) * 2.25) solid;">
				</div>
			</div>
		`;
	}
}