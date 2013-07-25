var valeurAdditionROF:float =0.1f;
var timer = false;
var dureeDeVieEnSecondes:float = 3.0f;
var dureeDuBonus:float = 3.0f;
private var tempsVivant:float = 0f;
private var dejaRentrer = false;

function Update(){
if(timer){
	if(dureeDeVieEnSecondes>0){
	tempsVivant +=Time.deltaTime;
	if(tempsVivant >=dureeDeVieEnSecondes){
		Destroy(this.gameObject);
	}

	}
}
	
}
function OnTriggerEnter(other:Collider){
	if(other.tag == "Player" && !dejaRentrer){
		dejaRentrer = true;
		other.gameObject.GetComponent(scr_VaisseauAvatar).cadence-=valeurAdditionROF;
		for(var r : Renderer in GetComponentsInChildren(Renderer)){
			r.enabled = false;
		}		
		yield WaitForSeconds (dureeDuBonus);
		other.gameObject.GetComponent(scr_VaisseauAvatar).cadence +=valeurAdditionROF;
		Destroy(this.gameObject);
	}
}