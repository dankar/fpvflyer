#pragma strict

private var scoreKeeper : ScoreKeeper;

function OnTriggerEnter(collider : Collider)
{
	Debug.Log("FinishTrigger");
	if(collider.tag == "Player")
	{
		var checkpointList : GameObject[];
		checkpointList = GameObject.FindGameObjectsWithTag("CheckPoint");
		
		for(var checkpoint : GameObject in checkpointList)
		{
			if(!checkpoint.transform.FindChild("CheckPointTrigger").GetComponent(CheckPointLogic).IsTriggered)
			{
				return;
			}
		}
		scoreKeeper.LevelEnd = Time.realtimeSinceStartup;
		Application.LoadLevel("ScoreScreen");
	}
}

function Start () {
	scoreKeeper = GameObject.Find("ScoreKeeperObject").GetComponent(ScoreKeeper);
}

function Update () {

}