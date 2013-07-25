
var spawnerAActiver : scr_Spawner[];

function Start(){
	for (var spawner in spawnerAActiver){
		spawner.spawnAvecTrigger = true;
	}
	
}

function OnTriggerEnter(other : Collider){
	if(other.tag == "Player"){
		
		for (var spawner in spawnerAActiver){
		spawner.Spawn();
		}
		Destroy(this.gameObject);
	}
	
}

function OnDrawGizmos(){
	Gizmos.color = Color.black;
	Gizmos.DrawCube(this.transform.position,this.transform.localScale);
}

function OnDrawGizmosSelected(){
	Gizmos.color = Color.white;
	Gizmos.DrawCube(this.transform.position,this.transform.localScale);
}