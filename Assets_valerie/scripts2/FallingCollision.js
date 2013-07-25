#pragma strict
var enable = false;
var vitesse = 5;
function Start () {

}

function Update () {
	if(enable){
		transform.position.y -= vitesse *Time.deltaTime;
	}

}