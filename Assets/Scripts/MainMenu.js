#pragma strict

import System.Collections.Generic;

var scenes = 	[	
					['scene1','Första banan'],
					['scene2','Andra banan']
				];
				
private var playerInput : PlayerInput;

private var stateMain : int = 1;				
private var stateOptions : int = 2;
private var stateCalibration : int = 3;
private var stateInputs : int = 4;
private var state : int = stateMain;

private var center_x : int = Screen.width/2/2;
private var center_x_2 : int = Screen.width/2/2*3;
private var center_y : int = Screen.height/2/2/2;

// Gui arrow position [row]
private var gui_arrow_pos : int = 0;
private var gui_callbacks : List.<Function> = new List.<Function>();

function Start () {

}

function Update () {

	// Enable movement up/down by using joystick/Gamepad
	if( gui_arrow_pos < gui_callbacks.Count-1 && Input.GetKeyDown("down") ) {
		gui_arrow_pos++;
	} else if (gui_arrow_pos > 0 && Input.GetKeyDown("up") ) {
		gui_arrow_pos--;
	}
	
	// X or Start (gamepad) or Enter (keyboard launches the selected menu item
	if ( Input.GetKeyDown("joystick button 1") || Input.GetKeyDown("joystick button 9")  || Input.GetKeyDown("return") ) {
		gui_callbacks[gui_arrow_pos](gui_arrow_pos);
		Debug.Log("Ok");
	}
	
}

function initMainMenu() {
	
	// One button per level
	for(var i=0;i<scenes.length;i++) {
		gui_callbacks.Add(function(i) {
			Application.LoadLevel(scenes[i][0]);
		});
	}
	
	// Callback n-2, Change to options menu
	gui_callbacks.Add(function() {
		changeState(stateOptions);
	});
	
	// Callback n-1, Exit
	gui_callbacks.Add(function() {
		Application.Quit();
	});

}

function drawMainMenu()
{	

	// Both left and right screen
	for(cur_center_x in [center_x,center_x_2]) {
	
		// One button per level
		for(var i=0;i<scenes.length;i++) {

			if (GUI.Button (Rect (cur_center_x-90+20,center_y-15+50+35*i,180,30), scenes[i][1])) {
				 gui_callbacks[i](i);
			}

		}
		
		if (GUI.Button (Rect (cur_center_x-90+20,center_y-15+50+35*i,180,30), "Options")) {
			gui_callbacks[gui_callbacks.Count-2]();
		}
		
		if (GUI.Button (Rect (cur_center_x-90+20,center_y-15+50+35*(i+1),180,30), "Exit")) {
			gui_callbacks[gui_callbacks.Count-1]();
		}
		
	}
	
	drawGuiArrow();
}

function initCalibrationMenu() {

	// Callback 0, Change to options menu
	gui_callbacks.Add(function() {
			changeState(stateOptions);
	});
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
			gui_callbacks[0]();
		}
		
	}

	drawGuiArrow();
	
}

function initInputsMenu()
{
	// Callback 0-3, Map dpad
	gui_callbacks.Add(function() {
			changeState(stateOptions);
	});
	gui_callbacks.Add(function() {
			changeState(stateOptions);
	});
	gui_callbacks.Add(function() {
			changeState(stateOptions);
	});
	gui_callbacks.Add(function() {
			changeState(stateOptions);
	});
	
	// Callbacks 4-7, Map buttons
	gui_callbacks.Add(function() {
			changeState(stateOptions);
	});
	gui_callbacks.Add(function() {
			changeState(stateOptions);
	});
	gui_callbacks.Add(function() {
			changeState(stateOptions);
	});
	gui_callbacks.Add(function() {
			changeState(stateOptions);
	});
	
	// Callback 8, Save & return
	gui_callbacks.Add(function() {
			changeState(stateOptions);
	});
	
	// Callback 9, Discard and return
	gui_callbacks.Add(function() {
			changeState(stateOptions);
	});
}

function drawInputsMenu()
{

	// Both left and right screen
	for(cur_center_x in [center_x,center_x_2]) {
	
		// Buttons
		GUI.Button(Rect (cur_center_x-90+20,center_y-15+50+35*0,180,30), "D-pad Up");
		GUI.Button(Rect (cur_center_x-90+20,center_y-15+50+35*1,180,30), "D-pad Down");
		GUI.Button(Rect (cur_center_x-90+20,center_y-15+50+35*2,180,30), "D-pad Left");
		GUI.Button(Rect (cur_center_x-90+20,center_y-15+50+35*3,180,30), "D-pad Right");
		GUI.Button(Rect (cur_center_x-90+20,center_y-15+50+35*4,180,30), "Gamepad X");
		GUI.Button(Rect (cur_center_x-90+20,center_y-15+50+35*5,180,30), "Gamepad Y");
		GUI.Button(Rect (cur_center_x-90+20,center_y-15+50+35*6,180,30), "Gamepad A");
		GUI.Button(Rect (cur_center_x-90+20,center_y-15+50+35*7,180,30), "Gamepad B");
		
		// ... and corresponding labels
		GUI.Label(Rect (cur_center_x-90+20+200,center_y-15+50+35*0,70,30), playerInput.getMappedKey("dpad_up"));
		GUI.Label(Rect (cur_center_x-90+20+200,center_y-15+50+35*1,70,30), playerInput.getMappedKey("dpad_down"));
		GUI.Label(Rect (cur_center_x-90+20+200,center_y-15+50+35*2,70,30), playerInput.getMappedKey("dpad_left"));
		GUI.Label(Rect (cur_center_x-90+20+200,center_y-15+50+35*3,70,30), playerInput.getMappedKey("dpad_right"));
		GUI.Label(Rect (cur_center_x-90+20+200,center_y-15+50+35*4,70,30), playerInput.getMappedKey("x"));
		GUI.Label(Rect (cur_center_x-90+20+200,center_y-15+50+35*5,70,30), playerInput.getMappedKey("y"));
		GUI.Label(Rect (cur_center_x-90+20+200,center_y-15+50+35*6,70,30), playerInput.getMappedKey("a"));
		GUI.Label(Rect (cur_center_x-90+20+200,center_y-15+50+35*7,70,30), playerInput.getMappedKey("b"));
		
		// Navigation buttons
		if (GUI.Button (Rect (cur_center_x-90+20,center_y-15+50+35*8,180,30), "Save")) {
			gui_callbacks[8]();
		}
		if (GUI.Button (Rect (cur_center_x-90+20,center_y-15+50+35*9,180,30), "Cancel")) {
			gui_callbacks[9]();
		}	
	}

	drawGuiArrow();
	
}

function initOptionsMenu() {

	// Callback 0, Change to calibration menu
	gui_callbacks.Add(function() {
			changeState( stateCalibration );
	});
	
	// Callback 1, Change to inputs menu
	gui_callbacks.Add(function() {
			changeState( stateInputs );
	});
	
	// Callback 2, Change to main menu
	gui_callbacks.Add(function() {
			changeState( stateMain );
	});
	
}
function drawOptionsMenu()
{
	// Both left and right screen
	for(cur_center_x in [center_x,center_x_2]) {
		if (GUI.Button (Rect (cur_center_x-90+20,center_y-15+50+35*0,180,30), "Calibrate controller")) {
			gui_callbacks[0]();
		}
		
		if (GUI.Button (Rect (cur_center_x-90+20,center_y-15+50+35*1,180,30), "Inputs")) {
			gui_callbacks[1]();
		}
		
		if (GUI.Button (Rect (cur_center_x-90+20,center_y-15+50+35*2,180,30), "Back")) {
			gui_callbacks[2]();
		}
	}
	
	drawGuiArrow();
}

function resetGuiArrow() {
	gui_arrow_pos = 0;
	gui_callbacks.Clear();
}

function drawGuiArrow() {
	
	// Both left and right screen
	for(cur_center_x in [center_x,center_x_2]) {
	
		GUI.Button (Rect (cur_center_x-90-20,center_y-15+50+35*gui_arrow_pos,30,30), ">");
	
	}
}

function changeState(newState) {

	resetGuiArrow();
	state = newState;
	
}

function OnGUI () {

	playerInput = GetComponent(PlayerInput);
	 
	switch(state)
	{
		case stateMain:
			if( gui_callbacks.Count == 0 ) initMainMenu();
			drawMainMenu();
			break;
		case stateOptions:
			if( gui_callbacks.Count == 0 ) initOptionsMenu();
			drawOptionsMenu();
			break;
		case stateCalibration:
			if( gui_callbacks.Count == 0 ) initCalibrationMenu();
			drawCalibrationMenu();
			break;
		case stateInputs:
			if( gui_callbacks.Count == 0 ) initInputsMenu();
			drawInputsMenu();
			break;
	}
}