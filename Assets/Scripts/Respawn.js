#pragma strict

function Respawn()
{
	var spawnpoint = GameObject.Find("SpawnPoint");
	rigidbody.angularVelocity = Vector3(0,0,0);
	rigidbody.velocity = Vector3(0,0,0);
	transform.position = spawnpoint.transform.position;
	transform.rotation = spawnpoint.transform.rotation;
}

function Start () {
	Respawn();
}

function Update () {
	
	var respawn = Input.GetKey("r");
	
	if(respawn)
	{
		Respawn();
		return;
	}
}