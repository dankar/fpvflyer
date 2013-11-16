#pragma strict

var IsTriggered : int = 0;

function OnTriggerEnter(collider : Collider)
{
	if(collider.tag == "Player")
	{
		IsTriggered = 1;
		this.transform.parent.FindChild("CheckPointActive").renderer.enabled = false;
	}
}
	

function Start () {

}

function Update () {

}