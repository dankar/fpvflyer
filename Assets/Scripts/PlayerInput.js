#pragma strict

private var stateMain : int = 1;				

private var input_map : Hashtable = new Hashtable();

function getCurrentKey() {
	var e = System.Enum.GetNames(typeof(KeyCode)).Length;
	for(var i = 0; i < e; i++)
	{
		if(Input.GetKey(i))
		{
			return (i);
		}
	}
	return KeyCode.None;
}

function getMappedKey(key) : String {
	return input_map[key];
}

function waitForKey() {
	var pressedKeyCode : KeyCode = KeyCode.None;
	while( pressedKeyCode == KeyCode.None ) {
		pressedKeyCode = getCurrentKey();
	}
	return pressedKeyCode;
}

function Start () {

	// Default input map
	input_map['x'] = "joystick button 0";
	input_map['y'] = "joystick button 1";
	input_map['a'] = "joystick button 2";
	input_map['b'] = "joystick button 3";
	
	input_map['dpad_up'] = "up";
	input_map['dpad_down'] = "down";
	input_map['dpad_left'] = "left";
	input_map['dpad_right'] = "right";
	
	input_map['dpad_start'] = "return";
	
}

function Update () {

}

function OnGUI () {

}