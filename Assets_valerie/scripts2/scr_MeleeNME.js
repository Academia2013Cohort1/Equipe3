var maVitesse :float = 1.0f;
private var player : GameObject;
var meleeDistance = 2;
var dommage = 10;
function Start(){
	player = GameObject.FindGameObjectWithTag("Player");
}
function Update () {
/*var dist = Vector3.Distance(transform.position, player.transform.position);
	if(dist >= meleeDistance){
		Destroy(gameObject);
	}
	transform.position = Vector3.Lerp(transform.position, player.transform.position, maVitesse*Time.deltaTime);*/
Destroy(gameObject,1);
}

function OnTriggerEnter(other:Collider){
	if(other.tag =="Player"){
		other.GetComponent(scr_PlayerHealth).curHealth -= dommage;
		Destroy(gameObject);
	}
}
