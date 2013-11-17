#pragma strict

private var scoreKeeper : ScoreKeeper;
private var playerInput : PlayerInput;

function Start () {
	playerInput = GetComponent(PlayerInput);
	scoreKeeper = GameObject.Find("ScoreKeeperObject").GetComponent("ScoreKeeper");	
}

function Update () {
	
	// Go to main menu on press of x or start
	if(Input.GetKeyDown(playerInput.getMappedKeyCode("start")) || Input.GetKeyDown(playerInput.getMappedKeyCode("x"))) {
		Application.LoadLevel("MainMenu");
	}
	
}

function drawScoreMenu()
{	

	GUI.TextArea(Rect (20,50+35*0,180,30), (scoreKeeper.LevelEnd - scoreKeeper.LevelStart).ToString());
	if (GUI.Button (Rect (20,50+35*1,180,30), "Main Menu")) {
		// The player can also press x or start to get to the main menu
		Application.LoadLevel("MainMenu");
	}
}

function OnGUI () {
	GUI.Box(Rect(10,10,100,500),"FPV Flyer");
	
	drawScoreMenu();
}