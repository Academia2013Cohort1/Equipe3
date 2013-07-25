#pragma strict

var maVitesse :float = 0.1f;
var dommage = 10;
var destroyTime = 2;

function Start(){
	
	Destroy(this.gameObject,destroyTime);
	
}
function FixedUpdate () {
	this.transform.Translate(Vector3(-maVitesse,0,0),Space.Self);
}

function OnTriggerEnter(other:Collider){
	if(other.tag =="Player"){
		
		other.GetComponent(scr_PlayerHealth).curHealth -= dommage;
		Destroy(this.gameObject);
	}
/*	if(other.tag!="Bonus" && other.gameObject.layer !="NME" ){
		print("Je touche QQC");
		Destroy(this.gameObject);
	}*/
}


function AddVitesseVaisseau(vitesseVaisseau : float){
	maVitesse +=vitesseVaisseau;
}