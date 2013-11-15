#pragma strict

var scenes = 	[	
					['scene1','Första banan'],
					['scene2','Andra banan']
				];

function Start () {

}

function Update () {

}

function OnGUI () {
	
	GUI.Box(Rect(10,10,100,500),"FPV Flyer");
	
	for(var i=0;i<scenes.length;i++) {
		if (GUI.Button (Rect (20,50+35*i,180,30), scenes[i][1])) {
			Application.LoadLevel(scenes[i][0]);
		}
	}

}