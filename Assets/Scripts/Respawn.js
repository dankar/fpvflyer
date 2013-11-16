#pragma strict

private var scoreKeeper : ScoreKeeper;

function Respawn()
{
	var spawnpoint = GameObject.Find("SpawnPoint");
	rigidbody.angularVelocity = Vector3(0,0,0);
	rigidbody.velocity = Vector3(0,0,0);
	transform.position = spawnpoint.transform.position;
	transform.rotation = spawnpoint.transform.rotation;
	
	var checkpointList : GameObject[];
	checkpointList = GameObject.FindGameObjectsWithTag("CheckPoint");
	
	for(checkpoint in checkpointList)
	{
		checkpoint.transform.FindChild("CheckPointActive").renderer.enabled = true;
		checkpoint.transform.FindChild("CheckPointTrigger").GetComponent(CheckPointLogic).IsTriggered = 0;
	}
	
	scoreKeeper.LevelStart = Time.realtimeSinceStartup;
}


function Start () 
{
	scoreKeeper = GameObject.Find("ScoreKeeperObject").GetComponent(ScoreKeeper);
	
	Respawn();
}

function Update () 
{
	if(Input.GetKey("r") || Input.GetKey("joystick button 9"))
	{
		Respawn();
		return;
	}
}