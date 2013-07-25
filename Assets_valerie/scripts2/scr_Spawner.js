#pragma strict


var delaiDeSpawn : float = 2.0f;
var nombreDeSpawn : int = 3; //si -1, spawn a l'infini sauf s'il ressort de l'ecran
var spawnAvecTrigger : boolean = true;
var ennemiModele:scr_VaisseauNMEVolant;

var nePasToucher : GameObject;//doit contenir le prefab de vaisseau NME
private var dejaApparu : boolean= false;
private var nbSpawnsActifs  : int = 0;

//variables identiques aux vaisseaux ennemis.  L'ennemi spawné sera identique a ces parametres


private var monExplosion:GameObject;

private var typeDeplacement:int;
private var vitesse:float=2.0f;
private var ROF : float = 1.0f;
private var projectile : GameObject; //si null, ne tire pas!
private var boostVitesseProjectile : float = 1.0f;
private var amplitude:float=1f;
private var frequence:float = 1f;
private var omega:float = 0.5;
private var offsetSuivi:float = 0f;
private var valeurPoints:int = 1;
private var active : boolean = false;

function Start(){
	monExplosion = ennemiModele.monExplosion;
	typeDeplacement = ennemiModele.typeDeplacement;
	vitesse = ennemiModele.vitesse;
	ROF = ennemiModele.ROF;
	projectile = ennemiModele.projectile;
	boostVitesseProjectile = ennemiModele.boostVitesseProjectile;
	amplitude = ennemiModele.amplitude;
	frequence = ennemiModele.frequence;
	omega = ennemiModele.omega;
	offsetSuivi = ennemiModele.offsetSuivi;
	valeurPoints = ennemiModele.valeurPoints;
	//Destroy(ennemiModele.gameObject);
	
}

function AssignationNouvelleEnnemi(instance:scr_VaisseauNMEVolant){
	
	instance.monExplosion = this.monExplosion;
	instance.utiliseTrigger = false;
	instance.typeDeplacement =this.typeDeplacement;
	instance.vitesse = this.vitesse;
	instance.ROF = this.ROF;
	instance.projectile = this.projectile;
	instance.boostVitesseProjectile = this.boostVitesseProjectile;
	instance.amplitude = this.amplitude;
	instance.frequence = this.frequence;
	instance.omega = this.omega;
	instance.offsetSuivi = this.offsetSuivi;
	instance.valeurPoints = this.valeurPoints;
}


function OnBecameVisible(){
	
	if(!spawnAvecTrigger){
		dejaApparu = true;
		Spawn();
	}
}

function OnBecameInvisible(){
	
	if(dejaApparu &&spawnAvecTrigger){
		dejaApparu = false;
		Destroy(this.gameObject);
	}
}

function Spawn(){
	nbSpawnsActifs++;
	var tempGO : GameObject = Instantiate(nePasToucher , this.transform.position, Quaternion.identity);
	tempGO.GetComponent(scr_VaisseauNMEVolant).spawnerParUnSpawner = true;
	var tempShip:scr_VaisseauNMEVolant = tempGO.GetComponent(scr_VaisseauNMEVolant);
	AssignationNouvelleEnnemi(tempShip);
	if(nbSpawnsActifs<nombreDeSpawn || nombreDeSpawn==-1){
		Invoke("Spawn",delaiDeSpawn );
		
	}
}


function OnDrawGizmos(){
	Gizmos.color = Color.black;
	Gizmos.DrawSphere(this.transform.position, 0.5f);
}

function OnDrawGizmosSelected(){
	Gizmos.color = Color.white;
	Gizmos.DrawSphere(this.transform.position, 0.5f);
}