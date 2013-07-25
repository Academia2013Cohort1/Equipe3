var maVitesse :float = 1.0f;
private var player : GameObject;
var meleeDistance = 2;
var dommage = 10;

function Start(){
	player = GameObject.FindGameObjectWithTag("Player");
}

function Update () {
Destroy(gameObject,1);
}

function OnTriggerEnter(other:Collider){
	if(other.tag =="NME"){
		other.GetComponent(scr_NMEHealth).curHealth -= dommage;
		Destroy(this.gameObject);
	}
}
