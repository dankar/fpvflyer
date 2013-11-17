#pragma strict

// All of the controlled buttons, and their KeyCode
public var button_config = 
	[
		["D-pad Up","dpad_up"],
		["D-pad Down","dpad_down"],
		["D-pad Left","dpad_left"],
		["D-pad Right","dpad_right"],
		["Gamepad X","x"],
		["Gamepad Y","y"],
		["Gamepad A","a"],
		["Gamepad B","b"],
		["Start","start"]
		
	];

// Holds the current input map, the keys are saved as their string representation
private var input_map : Hashtable = new Hashtable();

// Staged input map is used while configuring new keys
private var input_map_staged : Hashtable = new Hashtable();

// Helper variables for the key pressed coroutine
private var input_waiting = false;
private var input_waiting_delay = false;
private var input_found = false;
private var current_key : KeyCode = KeyCode.None;
private var current_destination : String = "";

// We need this to avoid requests before initiated
private var playerinput_ready = false;

function getCurrentKey() : KeyCode {

	var e = System.Enum.GetNames(typeof(KeyCode));

	for(key in e)
	{
		var keyCode : KeyCode = System.Enum.Parse(KeyCode,key);
		if(key != "None" && Input.GetKey(keyCode))
		{
			return System.Enum.Parse(KeyCode,key);
		}
	}
	return KeyCode.None;
}

function waitForKey(dest) {
	
	// We cannot wait for two keys at the same time
	if( input_waiting == false) {
		// Start waiting for a pressed key, actual coroutine loop is in Start()
		current_key = KeyCode.None;
		current_destination = dest;
		input_waiting = true;
		input_waiting_delay = true;
		input_found = false;
	}
	
}

function endWait() {

	Debug.Log("Got key " + current_key);
	
	// Assign new key
	input_map_staged[current_destination] = System.Enum.GetName(KeyCode,current_key);
	
	// Reset helper variables
	current_key = KeyCode.None;	
	current_destination = "";
	input_waiting = false;
	input_waiting_delay = false;
	input_found = false;
	
}

function saveStaged() {
	// Deep copy the staged map
	input_map = input_map_staged.Clone();
	
	savePlayerPrefs();
}

function discardStaged() {
	// Deep copy the real map
	input_map_staged = input_map.Clone();
}

function readPlayerPrefs() {
	var temp_input_map : Hashtable = input_map.Clone();
	for(key in temp_input_map.Keys) {
		if(PlayerPrefs.HasKey("PlayerInput_"+key)) {
			input_map[key] = PlayerPrefs.GetString("PlayerInput_"+key);
		}
	}
}

function savePlayerPrefs() {
	for(key in input_map.Keys) {
		PlayerPrefs.SetString("PlayerInput_"+key,input_map[key]);
	}
	PlayerPrefs.Save();
}

function getMappedKey(key) : String {
	
	if( playerinput_ready ) return input_map[key];
	
	return "None";
}

function getMappedKeyCode(key) : KeyCode {
	
	if( playerinput_ready ) return System.Enum.Parse(KeyCode,input_map[key]);
	
	return KeyCode.None;
}

function getStagedKey(key) : String {
	return input_map_staged[key];
}

function Start () {
	
	// Default input map
	input_map['x'] = "JoystickButton0";
	input_map['y'] = "JoystickButton1";
	input_map['a'] = "JoystickButton2";
	input_map['b'] = "JoystickButton3";
	
	input_map['dpad_up'] = "UpArrow";
	input_map['dpad_down'] = "DownArrow";
	input_map['dpad_left'] = "LeftArrow";
	input_map['dpad_right'] = "RightArrow";
	
	input_map['start'] = "Return";
	
	// Override default input map with player preferences
	readPlayerPrefs();
	
	// Make the staged map a deep copy of input_map
	input_map_staged = input_map.Clone();

	// Flag this class as ready
	playerinput_ready = true;
	
	// Coroutine to get the currently pressed key
	while(true) {
	
		// We need to wait a couple of frames before we start to get the input
		// to avoid getting the key pressed for entering wait mode
		if(input_waiting && !input_waiting_delay) {
			current_key = getCurrentKey();
			if(current_key != KeyCode.None) {
				// Key Found
				endWait();
			}
		} else if ( input_waiting_delay ) {
			input_waiting_delay = false;
			yield WaitForSeconds(0.2);
		}
	
		// Next frame please
		yield;
	}
}

function Update () {

}

function OnGUI () {

}