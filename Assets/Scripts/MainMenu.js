#pragma strict

var is_visible = false;

function Start () {

}

function Update () {
	/*if ( !is_visible && Input.GetKey ("joystick button 11") ) is_visible = true;
	else if ( is_visible && Input.GetKey("joystick button 12") ) is_visible = false; */
	for( var i=1; i < 13; i++ ) {
		if( Input.GetKeyUp("joystick button "+i) ) {
			Debug.Log("Btn " + i + " pressed");
		 }
	}
}

function OnGUI () {

	
	/*if ( is_visible ) {
		GUI.Box(Rect(10,10,200,500), "Inställningar");
		
		if (GUI.Button (Rect (20,50,180,30), "Starta om")) {
			print ("You clicked the button!");
		}
	}*/
	
}