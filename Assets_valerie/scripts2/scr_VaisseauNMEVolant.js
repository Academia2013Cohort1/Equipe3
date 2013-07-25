
enum typeMouvement{
	
	Droit = 0,
	Sinusoidal = 1,
	Diagonal_Bas =2,
	Diagonal_Haut =3,
	Statique = 4,
	Follow = 5,
	Tombe=6,
	Adaptive = 7
}

var monExplosion:GameObject;
var utiliseTrigger:boolean = false;
var typeDeplacement:typeMouvement;
var actifSelonLaDistance = false;
var distanceDactivation = 5f;
var vitesse:float=2.0f;
var ROF : float = 1.0f;
var projectile : GameObject; //si null, ne tire pas!
var meleePrefab: GameObject;
var boostVitesseProjectile : float = 1.0f;
var amplitude:float=1f;
var frequence:float = 1f;
var omega:float = 0.5;
var offsetSuivi:float = 0f;
var vitesseDeSuivisEnY = 2.5;
var valeurPoints:int = 1;
var adaptiveAiRange = 10f;
var apparaitreEnFaceDuJoueur = false;
var	suivreLeJoueurEnY = false;
var tournerCoterDuJoeur = false;
var regarderLeJoueur = false;
var meleeDistance:float = 3.5;
var meleeAttack = false;
var monBonus : GameObject; //si null, ne tire pas!
var spawnerParUnSpawner = false;
var animAttaqueRange ="Range";
var animAttaqueMelee ="melee";
var animMovement ="run";
var animIdle ="idle";
var animMort ="mort";
var isShooter = false;
private var monManager:scr_GameManager;
private var temps:float=0;
private var actif:boolean = false;
private var dejaApparu :boolean = false;
private var player: Transform;
private var InRange = false;
private var vitesseInitial : float;
private var iDie = false;
private var nmeAnimation: Animation;
function Start(){
	vitesseInitial = vitesse;
	temps+=offsetSuivi;
	monManager = GameObject.FindGameObjectWithTag("Manager").GetComponent(scr_GameManager);
	nmeAnimation = this.GetComponentInChildren(Animation);
	if(nmeAnimation != null){
	nmeAnimation.wrapMode = WrapMode.Loop;
	nmeAnimation[animAttaqueMelee].wrapMode = WrapMode.Once;
	nmeAnimation[animAttaqueRange].wrapMode = WrapMode.Once;
	nmeAnimation[animAttaqueRange].layer = 1;
	nmeAnimation[animAttaqueMelee].layer = 1;
	nmeAnimation[animMort].layer = 2;
	nmeAnimation[animMort].wrapMode = WrapMode.Once;
	nmeAnimation.Stop();
	}
}

function FixedUpdate () {
	var playerObj = GameObject.FindGameObjectWithTag("Player");
	if(playerObj != null){
		player = playerObj.transform;
		var dist = Vector3.Distance(player.position, transform.position);
		if(actifSelonLaDistance && !utiliseTrigger){
			if(	dist <= distanceDactivation ){
				dejaApparu = true;
				if(!actif){
				ActiveNME();
				}
			}
		}
	if((transform.position.x < player.transform.position.x) && tournerCoterDuJoeur){
		transform.eulerAngles.y = Mathf.Lerp(transform.eulerAngles.y, 180, 10*Time.deltaTime);
	}
	else{
		transform.eulerAngles.y = Mathf.Lerp(transform.eulerAngles.y, 0, 10* Time.deltaTime);
	}

	if(actif){
		switch(typeDeplacement){
			case 0:
			mvDroit();
			break;
			case 1:
			mvSinus();
			break;
			case 2:
			mvDiagoBas();
			break;
			case 3:
			mvDiagoHaut();
			break;
			case 4:
			vitesse=0;
			if(nmeAnimation != null){
				nmeAnimation.CrossFade(animIdle);
			}
			break;
			case 5:
			Follow();
			break;
			case 6:
			Tombe();
			break;
			case 7:
			AdaptiveAI();
			break;
		}
		if(suivreLeJoueurEnY){
		transform.position.y = Mathf.Lerp(transform.position.y, player.position.y, vitesseDeSuivisEnY * Time.deltaTime);
		}
	}
			
	}
		if(iDie){
			if(nmeAnimation != null){
				if(!nmeAnimation.IsPlaying(animMort)){
				Destroy(gameObject);
				}
			}
			else if(nmeAnimation == null){
				Destroy(gameObject);
			}
		}
	
}

function Update(){
	var point: Vector3 = player.position;
	var angle: float;
	
		if (regarderLeJoueur)
		{
			point.z = 0;
			var playerToMouse: Vector3 = point - this.transform.position;
			playerToMouse.Normalize();
			angle = Mathf.Acos(Vector3.Dot(playerToMouse, Vector3(1, 0, 0))) * Mathf.Rad2Deg;
			if (point.y < transform.position.y) angle = -angle;
			
			this.transform.rotation.eulerAngles.z = angle;
		}
}

function OnBecameVisible(){
	
	if(!utiliseTrigger && !actifSelonLaDistance){
		dejaApparu = true;
		ActiveNME();
	}
}

function OnBecameInvisible(){
	if(spawnerParUnSpawner){
		yield WaitForSeconds(5);
		DestroyNME();
	}
	if(dejaApparu && utiliseTrigger){
		dejaApparu = false;
		
		DestroyNME();
	}
}

function DestroyNME(){
		if(nmeAnimation != null){
		nmeAnimation.Play(animMort);
		}
		vitesse = 0;
		//Instantiate(monExplosion,this.transform.position,Quaternion.identity);
		
		if(monBonus != null){
			Instantiate(monBonus,this.transform.position,Quaternion.identity);
		}
		else{
		
		monManager.AjouterScore(valeurPoints);
		}
		iDie = true;
}

//Fonctions maison

function mvDroit(){
	if(nmeAnimation != null){
	nmeAnimation.CrossFade(animMovement);
	}
	this.transform.Translate(-vitesse,0,0,Space.World);
	//print("mouvement Droit");
}
function mvSinus(){
	if(nmeAnimation != null){
	nmeAnimation.CrossFade(animMovement);
	}
	var monX :float = transform.position.x - omega*temps*vitesse;
	var monY :float = transform.position.y + amplitude*Mathf.Sin(omega*temps);
	this.transform.position = Vector3(monX,monY,0);
	temps++;
}

function mvDiagoBas(){
	if(nmeAnimation != null){
	nmeAnimation.CrossFade(animMovement);
	}
	this.transform.Translate(-vitesse,-vitesse, 0,Space.World);
}

function mvDiagoHaut(){
	if(nmeAnimation != null){
	nmeAnimation.CrossFade(animMovement);
	}
	this.transform.Translate(-vitesse,vitesse, 0,Space.World);
}

function ActiveNME(){
	actif = true;
	if(apparaitreEnFaceDuJoueur && !actifSelonLaDistance){
		gameObject.transform.position.y = player.position.y;
	}
	if(projectile!=null){
		if (meleeAttack == false) {
			InvokeRepeating("Shoot", ROF, ROF);
		}
	}
	
}

function Shoot(){
	if(meleeAttack == false && iDie == false)
	{
		if(nmeAnimation != null)
		{
			nmeAnimation.CrossFade(animAttaqueRange);
		}
		
		if (isShooter)
		{
			var nouvelleBoulette: GameObject = Instantiate(projectile,this.transform.position, this.transform.rotation);
  			nouvelleBoulette.GetComponent(scr_LaserNME).AddVitesseVaisseau(vitesse+boostVitesseProjectile);
  		}
	}
}

function Follow(){
	suivreLeJoueurEnY = false;
	if(nmeAnimation != null){
	nmeAnimation.CrossFade(animMovement);
	}
	var dist = Vector3.Distance(player.position, transform.position);
	if(dist >= meleeDistance){
		transform.position = Vector3.Lerp(transform.position, player.position, vitesse*Time.deltaTime);
	}
	if(meleeAttack && dist<= meleeDistance && !IsInvoking("Melee")){
		Invoke("Melee", ROF);
	}
}

function Melee(){
	if(iDie == false){
	if(nmeAnimation != null){
	nmeAnimation.CrossFade(animAttaqueMelee);
	}
	 Instantiate(meleePrefab,transform.position, transform.rotation);
	 }
}

function Tombe (){
	transform.position.y -= vitesse * Time.deltaTime;
	if(nmeAnimation != null){
	nmeAnimation.CrossFade(animMovement);
	}
}
function AdaptiveAI(){
var distance = Vector3.Distance(player.position, transform.position);
	if(distance <= adaptiveAiRange){
		vitesse = vitesseInitial;
		meleeAttack = true;
		Follow();
	}
	else{
		vitesse = 0;
		meleeAttack = false;
		if(nmeAnimation != null){
			nmeAnimation.CrossFade(animIdle);
		}
	}
}

function OnTriggerEnter(other:Collider)
{
	if(other.tag == "wall")
	{
		vitesse = -vitesse;
	}
}
