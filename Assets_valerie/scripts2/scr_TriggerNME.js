
var nmeAActiver : scr_VaisseauNMEVolant[];

function Start(){
	for (var nmes in nmeAActiver){
		nmes.utiliseTrigger = true;
	}
	
}

function OnTriggerEnter(other : Collider){
	if(other.tag == "Player"){
		
		for (var nmes in nmeAActiver){
			nmes.ActiveNME();
		}
		Destroy(this.gameObject);
	}
	
}

function OnDrawGizmos(){
	Gizmos.color = Color.blue;
	Gizmos.DrawCube(this.transform.position,this.transform.localScale);
}

function OnDrawGizmosSelected(){
	Gizmos.color = Color.yellow;
	Gizmos.DrawCube(this.transform.position,this.transform.localScale);
}