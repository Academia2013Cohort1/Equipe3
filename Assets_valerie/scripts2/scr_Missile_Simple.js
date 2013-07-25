var maVitesse :float = 1.0f;
var areaOfEffect:float = 2.0f;
var destroyTime:int = 2;
var dommage = 10;

function Start() {

Destroy(this.gameObject, destroyTime);

}

function FixedUpdate () {
	this.transform.Translate(Vector3(maVitesse,0,0),Space.Self);
}



function OnDestroy(){
	var enemisProches:GameObject[];
	enemisProches = GameObject.FindGameObjectsWithTag("NME");
	for(nme in enemisProches){
		var dist = Vector3.Distance(nme.transform.position, this.transform.position);
		if(dist<areaOfEffect){
			nme.GetComponent(scr_NMEHealth).curHealth -= dommage;
		}
	}
	
}

function OnTriggerEnter(other:Collider){
	if(other.tag =="NME"){
		Destroy(gameObject);
	}
	if(other.tag!="Player"){
		Destroy(this.gameObject, destroyTime);
	}
}