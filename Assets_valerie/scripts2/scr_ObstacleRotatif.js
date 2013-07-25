#pragma strict

public var speed : float = 10f;


function Update ()
{
    transform.Rotate(Vector3.up, speed * Time.deltaTime);
}

 

/*var rotationSpeed : float = 10;
var vitesseRotation:float = 0.1f; // signe influence le sens de rotation( >0 antihoraire, <0 horaire)
//var dommage:int = 1;
//var destructible:boolean = false;  

private var minimumY = -360;

private var maximumY = 360;

private var rotationY : float;

private var minimumX = -360;

private var maximumX = 360;

private var rotationX : float;

 

 

/*function Update () {

    

    //rotationX += Input.GetAxis("Vertical") * rotationSpeed;

    //rotationX = ClampAngle(rotationX, minimumX, maximumX);

    

    rotationY += Input.GetAxis("Horizontal") * rotationSpeed;

    rotationY = ClampAngle(rotationY, minimumY, maximumY);

    

    transform.rotation = Quaternion.AngleAxis(rotationY, Vector3.up);

    transform.rotation *= Quaternion.AngleAxis (rotationX, Vector3.right);

}

 

static function ClampAngle (angle : float, min : float, max : float) {

   if (angle < -360)

      angle += 360;

   if (angle > 360)

      angle -= 360;

   return Mathf.Clamp (angle, min, max);

}

//var vitesseRotation:float = 0.1f; // signe influence le sens de rotation( >0 antihoraire, <0 horaire)
//var dommage:int = 1;
//var destructible:boolean = false;

*/function Start () {

}

//function FixedUpdate () {
	//this.transform.RotateAround(this.transform.position, Vector3.forward, vitesseRotation);
//}

function OnTriggerStay(other:Collider){
	//if(other.tag =="Player") //reduire HP
}

function OnTriggerEnter(other:Collider)
{
	if (other.tag =="Player")
	{
		var player = other.GetComponent (scr_PlayerHealth);
		player.curHealth -= 20 * player.maxHealth/100;		
	}
}