#pragma strict

function Start () {

}

function Update () {

}

function OnGUI () {
	if (GUI.Button (Rect (10,10,150,100), "I am a button")) {
		print ("You clicked the button!");
	}
}