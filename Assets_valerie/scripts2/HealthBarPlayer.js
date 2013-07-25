#pragma strict
private var player : GameObject;
var modificationDeLaTaille = 1;
function Start(){
}
function Update () {
	var player = transform.parent;
	var MaxHealth = player.GetComponent(scr_PlayerHealth).maxHealth;
	var CurHealth = player.GetComponent(scr_PlayerHealth).curHealth;
	transform.localScale.x = (CurHealth/MaxHealth)*modificationDeLaTaille;
}