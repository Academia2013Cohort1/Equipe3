#pragma strict

var playerToRespawn: GameObject;
var tempsAvantDeRespawn = 2;
private var timer = 0;
function Start(){
	timer = tempsAvantDeRespawn;
}
function OnTriggerStay(other : Collider){
	if(other.tag == "Player"){
		if(timer <= 0)
		{
			playerToRespawn.GetComponent(scr_VaisseauAvatar).Ressucite();
			Destroy(gameObject);
		}
		else{
			timer -= 1 * Time.deltaTime;
		}
		
	}
}

function OnTriggerExit(other : Collider){
	if(other.tag == "Player"){
		timer = tempsAvantDeRespawn;
	}
}