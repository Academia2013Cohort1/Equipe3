var valeurAdditionVie:int =1;
var dureeDeVieEnSecondes:float = 3.0f;
private var tempsVivant:float = 0f;
var timer = false;

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
	if(other.tag == "Player"){
		other.gameObject.GetComponent(scr_PlayerHealth).curHealth+=valeurAdditionVie;
		Destroy(this.gameObject);
	}
}