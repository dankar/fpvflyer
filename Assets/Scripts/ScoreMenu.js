#pragma strict

private var scoreKeeper : ScoreKeeper;

function Start () {
	scoreKeeper = GameObject.Find("ScoreKeeperObject").GetComponent("ScoreKeeper");	
}

function Update () {

}

function drawScoreMenu()
{	

	GUI.TextArea(Rect (20,50+35*0,180,30), (scoreKeeper.LevelEnd - scoreKeeper.LevelStart).ToString());
	if (GUI.Button (Rect (20,50+35*1,180,30), "Main Menu")) {
		Application.LoadLevel("MainMenu");
	}
}

function OnGUI () {
	GUI.Box(Rect(10,10,100,500),"FPV Flyer");
	
	drawScoreMenu();
}