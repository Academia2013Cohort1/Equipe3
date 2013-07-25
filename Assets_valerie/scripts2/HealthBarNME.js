#pragma strict
private var NME : GameObject;
var modificationDeLaTaille = 1;
function Start(){
}
function Update () {
	var NME = transform.parent;
	var MaxHealth = NME.GetComponent(scr_NMEHealth).maxHealth;
	var CurHealth = NME.GetComponent(scr_NMEHealth).curHealth;
	transform.localScale.x = (CurHealth/MaxHealth)*modificationDeLaTaille;
}