#pragma strict

enum typeDeShmup {
	Horizontal = 1,
	Vertical =2
}

//var typeDeJeu:typeDeShmup;
private	var mesh:Mesh ;
private	var tabVertex:Vector3[] ;
private var vectorPtHautDroite:Vector3;
private var vectorPtBasGauche:Vector3;
function Start () {
	this.renderer.enabled =false;
	mesh = GetComponent(MeshFilter).mesh;
	tabVertex= mesh.vertices;
	vectorPtBasGauche = Vector3(retourneVertexMin("x"),retourneVertexMin("y"),0);
	vectorPtHautDroite = Vector3(retourneVertexMax("x"),retourneVertexMax("y"),0);

	var players = GameObject.FindGameObjectsWithTag("Player");
	for (var i = 0; i < players.length; ++i)
	{
		var vaisseau = players[i].GetComponent(scr_VaisseauAvatar);
		vaisseau.setLimites(vectorPtBasGauche.x+this.transform.position.x,vectorPtBasGauche.y+this.transform.position.y,
			vectorPtHautDroite.x+this.transform.position.x, vectorPtHautDroite.y+this.transform.position.y);
	}
	
	var tempManager: scr_GameManager = this.GetComponent(scr_GameManager);
	tempManager.SetLimitesVaisseau(Vector4(vectorPtBasGauche.x+this.transform.position.x,vectorPtBasGauche.y+this.transform.position.y,vectorPtHautDroite.x+this.transform.position.x,vectorPtHautDroite.y+this.transform.position.y));
}

function Update () {

}

function OnApplicationQuit (){
	
}

function retourneVertexMin(axe){
	
	var min:float = 100000f;
	//Comme le plan est tourné, y est en realite z)
	var facteurScale:float = (axe=="x")? this.transform.localScale.x : this.transform.localScale.z;
	for(vertex in tabVertex){
		if(axe =="x"){
			if(vertex.x*facteurScale<min){
				min = vertex.x*facteurScale;
			}
		}
		else{
			if(vertex.z*facteurScale<min){
				min = vertex.z*facteurScale;
			}
		}
	}

	return min;
}

function retourneVertexMax(axe){

	var max:float = 0f;
	//Comme le plan est tourné, y est en realite z)
	var facteurScale:float = (axe=="x")? this.transform.localScale.x : this.transform.localScale.z;
	for(vertex in tabVertex){
		if(axe =="x"){
			if(vertex.x *facteurScale>max){
				max = vertex.x*facteurScale;
			}
		}
		else{
			if(vertex.z*facteurScale>max){
				max = vertex.z*facteurScale;
			}
		}
	}
	return max;
}