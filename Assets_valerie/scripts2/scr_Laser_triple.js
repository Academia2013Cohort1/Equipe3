var maVitesse :float = 1.0f;
var destroyTime:int = 2;
var dommage = 10;

function Start() {

Destroy(this.gameObject, destroyTime);

}


function FixedUpdate () {
	this.transform.Translate(Vector3(maVitesse,0,0),Space.Self);
}


function OnTriggerEnter(other:Collider){
	if(other.tag =="NME"){
		other.GetComponent(scr_NMEHealth).curHealth -= dommage;
		Destroy(this.gameObject);
	}
	if(other.tag!="Player" && other.tag!="Bonus" && other.tag!="Trigger"){
		Destroy(this.gameObject, destroyTime);
	}
}