#pragma strict

var scenes = 	[	
					['scene1','Första banan'],
					['scene2','Andra banan']
				];
				

private var stateMain : int = 1;				
private var stateOptions : int = 2;
private var stateCalibration : int = 3;
private var state : int = stateMain;
private var center_x : int = Screen.width/2/2;
private var center_x_2 : int = Screen.width/2/2*3;
private var center_y : int = Screen.height/2;

function Start () {

}

function Update () {

}

function drawMainMenu()
{	
	// Both left and right screen
	for(cur_center_x in [center_x,center_x_2]) {
	
		// One button per level
		for(var i=0;i<scenes.length;i++) {
			
			if (GUI.Button (Rect (cur_center_x-90+20,center_y-15+50+35*i,180,30), scenes[i][1])) {
				Application.LoadLevel(scenes[i][0]);
			}

		}
		
		if (GUI.Button (Rect (cur_center_x-90+20,center_y-15+50+35*i,180,30), "Options")) {
			state = stateOptions;
		}
		
	}
}

function drawCalibrationMenu()
{

	var yaw = Input.GetAxis("yaw");
	var collective = Input.GetAxis("collective");
	var pitch = Input.GetAxis("pitch");
	var roll = Input.GetAxis("roll");
	
	// Both left and right screen
	for(cur_center_x in [center_x,center_x_2]) {
		GUI.TextArea(Rect (cur_center_x-90+20,center_y-15+50+35*0,180,30), yaw.ToString());
		GUI.TextArea(Rect (cur_center_x-90+20,center_y-15+50+35*1,180,30), collective.ToString());
		GUI.TextArea(Rect (cur_center_x-90+20,center_y-15+50+35*2,180,30), pitch.ToString());
		GUI.TextArea(Rect (cur_center_x-90+20,center_y-15+50+35*3,180,30), roll.ToString());
		
		if (GUI.Button (Rect (cur_center_x-90+20,center_y-15+50+35*4,180,30), "Save")) {
			state = stateOptions;
		}
		if (GUI.Button (Rect (cur_center_x-90+20,center_y-15+50+35*5,180,30), "Cancel")) {
			state = stateOptions;
		}
	}

}

function drawOptionsMenu()
{

	// Both left and right screen
	for(cur_center_x in [center_x,center_x_2]) {
		if (GUI.Button (Rect (cur_center_x-90+20,center_y-15+50+35*0,180,30), "Calibrate controller")) {
			state = stateCalibration;
		}
		
		if (GUI.Button (Rect (cur_center_x-90+20,center_y-15+50+35*1,180,30), "Back")) {
			state = stateMain;
		}
	}
}

function OnGUI () {

	switch(state)
	{
		case stateMain:
			drawMainMenu();
			break;
		case stateOptions:
			drawOptionsMenu();
			break;
		case stateCalibration:
			drawCalibrationMenu();
			break;
	}
}