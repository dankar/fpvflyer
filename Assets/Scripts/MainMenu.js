#pragma strict

import System.Collections.Generic;

var scenes = 	[	
					['scene1','First steps'],
					['scene2','Canyon'],
					['scene3','Volcano']
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
	playerInput = GetComponent(PlayerInput);
}

function Update () {

	// Enable movement up/down by using joystick/Gamepad
	if( gui_arrow_pos < gui_callbacks.Count-1 && Input.GetKeyDown(playerInput.getMappedKeyCode("dpad_down")) ) {
		gui_arrow_pos++;
	} else if (gui_arrow_pos > 0 && Input.GetKeyDown(playerInput.getMappedKeyCode("dpad_up")) ) {
		gui_arrow_pos--;
	}
	
	// X or Start (gamepad) or Enter (keyboard launches the selected menu item
	if ( Input.GetKeyDown(playerInput.getMappedKeyCode("start")) ) {
		gui_callbacks[gui_arrow_pos](gui_arrow_pos);
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
	// Callback for every key
	for(btn in playerInput.button_config) {
		gui_callbacks.Add(function() {
				playerInput.waitForKey(btn[1]);
		});
	}
	
	// Callback 8, Save & return
	gui_callbacks.Add(function() {
		playerInput.saveStaged();
		changeState(stateOptions);
	});
	
	// Callback 9, Discard and return
	gui_callbacks.Add(function() {
		playerInput.discardStaged();
		changeState(stateOptions);
	});
}

function drawInputsMenu()
{

	// Both left and right screen
	for(cur_center_x in [center_x,center_x_2]) {

		var idx : int = 0;		
		for(btn in playerInput.button_config) {
			if(GUI.Button(Rect (cur_center_x-90+20,center_y-15+50+35*idx,180,30), btn[0]))  {
				gui_callbacks[idx]();
			}
		
			// ... and corresponding labels
			GUI.Label(Rect (cur_center_x-90+20+200,center_y-15+50+35*idx,70,30), playerInput.getStagedKey(btn[1]));
			
			idx++;
		}
		
		// Navigation buttons
		if (GUI.Button (Rect (cur_center_x-90+20,center_y-15+50+35*(idx),180,30), "Save")) {
			gui_callbacks[idx]();
		}
		if (GUI.Button (Rect (cur_center_x-90+20,center_y-15+50+35*(idx+1),180,30), "Cancel")) {
			gui_callbacks[idx+1]();
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