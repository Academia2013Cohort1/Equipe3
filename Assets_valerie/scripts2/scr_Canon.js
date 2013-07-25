#pragma strict

var ROF : float = 2.0f;
var boulette:GameObject;
private var avatar:GameObject;
private var actif : boolean = true;
private var CONV_RAD_DEGRE: float = 57.2957795;
private var target:Vector3 ;
private var FORWARD:Vector3 = Vector3.right;
private var tempAngle : float;
function Start () {
	FindAvatar();
	
}

function FixedUpdate () {
	if(actif){
		
		if(avatar==null){
			print("Je Cancelle");
			CancelInvoke();
			FindAvatar();
			
		}
		else{
			target = avatar.transform.position - this.transform.position;
			
			tempAngle = target.y>0?CalculeAngle(target, FORWARD,1.0):CalculeAngle(target, FORWARD,-1.0); //si l'avatar est en dessous, on doit inverser l'angle...
			this.transform.rotation = Quaternion.Euler(0,0,tempAngle);
		}
		
	}
	
}


function FindAvatar(){
	avatar= GameObject.FindWithTag("Player");
	
	if(!IsInvoking("Tir")){
		InvokeRepeating("Tir",ROF,ROF);
	}
}

function OnBecameVisible(){
	actif = true;
	
}

function OnBecameInisible(){
	actif = false;
}

function Tir(){
	if(avatar!=null){
		Instantiate(boulette, this.transform.position, Quaternion.Euler(this.transform.rotation.eulerAngles - Vector3(0,0,180))) ;
		
	}
}

//Fonction maison reglant les probleme avec la fonction moteur...

function CalculeAngle(premier:Vector3, second:Vector3,sens : float ):float{
	
	var resultant:Vector3 = Vector3(premier.x * second.x, premier.y * second.y ,0);
	var produitScalaire : float = resultant.x + resultant.y ;
	var magnitudePremier : float = Mathf.Sqrt(premier.x*premier.x + premier.y*premier.y);
	var magnitudeSecond : float = Mathf.Sqrt(second.x*second.x + second.y*second.y);
	var magnitudePremierFoisSecond : float = magnitudePremier * magnitudeSecond;
	var total : float = Mathf.Acos(produitScalaire/magnitudePremierFoisSecond)*sens;
	return total * 57.2957795;
	
}