#pragma strict


var maxHealth:float = 100;
var curHealth:float = 0;
var barDeViePrefab : GameObject;
var healthBarEnable = false;
private var healthBar: GameObject;
private var dead = false;

function Start(){
	if(healthBarEnable){
		var healthBar = Instantiate(barDeViePrefab, transform.position+Vector3(0,0.7,0), Quaternion.identity);
		healthBar.transform.parent = transform;
		healthBar.transform.localScale.x = maxHealth/maxHealth;
	}
	curHealth = maxHealth;

}


function Update () {

	if (curHealth <= 0) {
	curHealth=0;
		if(!dead){
		gameObject.GetComponent(scr_VaisseauNMEVolant).DestroyNME();
		dead= true;
		}	
		
	 } 

	}