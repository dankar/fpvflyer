#pragma strict
@script RequireComponent(Rigidbody)

var cameraPivot : Transform;

var forwardSpeed : float = 4f;
var backwardSpeed : float = 1f;
var sidestepSpeed : float = 1f;
var jumpSpeed : float = 8f;

private var thisTransform : Transform;

function Start () {
	thisTransform = this.transform;
}

function OnCollisionEnter(collision : Collision) {
	/*// Debug-draw all contact points and normals
	for (var contact : ContactPoint in collision.contacts) {
		Debug.DrawRay(contact.point, contact.normal, Color.white, 5000);
	}
	
	Debug.Log(collision.collider.name);*/
}

function angleToCo(aoa : float, array : Array)
{
	var aoaMag = Mathf.Abs(aoa) * 45f;
	
	
	
	if(aoaMag >= (array.length-2))
	{
		return 0;
	}
	
	var intPart = Mathf.RoundToInt(aoaMag);
	var restPart : float;
	if(intPart != 0)
	{
		restPart = aoaMag % intPart;
	}
	else
	{
		restPart = aoaMag;
	}
	
	var firstCo = array[intPart];
	var secondCo = array[intPart+1];
	var effect = Mathf.Lerp(firstCo, secondCo, restPart);
	
	if(aoa < 0)
	{
		return -effect;
	}
	else
	{
		return effect;
	}
}

function angleToLiftCo(aoa : float)
{
	var liftArray = new Array(0.5, 0.61, 0.72, 0.83, 0.94, 1.05, 1.16, 1.27, 1.38, 1.49, 1.5, 1.59, 1.65, 1.69, 1.72, 1.75, 1.72, 1.69, 1.65, 1.59, 1.5);
	
	return angleToCo(aoa, liftArray);
}

function angleToDragCo(aoa : float)
{
	var aoaMag = Mathf.Abs(aoa) * 45f;
	
	var effect = Mathf.Pow(aoaMag, 2)/1500 + 0.025;
	
	if(aoaMag > 25)
	{
		return 0.44;
	}
	
	return effect;
	
	
}

function Update () {

	var yaw = Input.GetAxis("yaw");
	var collective = Input.GetAxis("collective");
	var pitch = Input.GetAxis("pitch");
	var roll = Input.GetAxis("roll");
	var hitInfo : RaycastHit;
	
	var collectiveForce : Vector3;
	
	collectiveForce = this.transform.TransformDirection(Vector3(0, collective * 12f, 0));
	
	var torqueVector = this.transform.TransformDirection(Vector3(pitch / 6f, yaw / 6f, roll / 6f));
	var forceVector = collectiveForce;
	var rayVector : Vector3;
	rayVector = this.rigidbody.transform.up * -1;
	
	// Cast ray downward. If it hits ground calculate ground effect depending on height (higher when you are lower)
	// and angle of incidence
	if(Physics.Raycast(this.rigidbody.position, rayVector, hitInfo))
	{
		if(hitInfo.distance < 6)
		{
			var force = 1 + (6 - hitInfo.distance) / 6 * 2; // Normalize distance to 0-1 and multiply effect by two.
			force *= Mathf.Abs(Vector3.Dot(rayVector, hitInfo.normal)); // Multiply by cos of angle of incidence
			//forceVector.y *= force;
			forceVector *= force;
		}
	}
	
	// Calculate angle of attack
	var velocity : Vector3;
	var aoa : float;
	var effect : float;
	
	velocity = this.rigidbody.velocity;
	// Calculate AoA. The AoA changes depending on the collective.
	aoa = -Vector3.Dot(this.rigidbody.transform.up, (velocity - collectiveForce).normalized); // AoA, 0 is in line with airfoil. Positive is positive AoA and vice versa
	//effect = 1 - Mathf.Abs(aoa); // Magnitude of effect (should be a curve)
	
	forceVector += this.rigidbody.transform.up * angleToLiftCo(aoa) * velocity.magnitude / 5f; // Add ground effect
	
	// Calculate AoA again for drag. This time the effect from the collective is inverted.
	aoa = -Vector3.Dot(this.rigidbody.transform.up, (velocity + collectiveForce).normalized); // AoA, 0 is in line with airfoil. Positive is positive AoA and vice versa
	
	forceVector += -velocity * angleToDragCo(aoa) / 5f; // Add drag dependent on angle of attack
	
	
	this.rigidbody.AddForce(forceVector);
	this.rigidbody.AddTorque(torqueVector);
	this.rigidbody.AddTorque(this.rigidbody.angularVelocity * -0.1);
}
