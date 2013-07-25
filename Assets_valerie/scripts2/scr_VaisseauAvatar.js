#pragma strict

//Variables parametrables
var playerIndex:int = 0;
var nombreDeVie = 3;
var aLoaderQuandGameOver = 0;
var restartCeNiveau = true;
var vitesse:float = 0.1f;
var cadence:float = 2f;
var cadenceMelee:float = 2f;
var qteMissiles:int = 1;
var qteAmmo:int = 1;
var typeLaser:int =0;
var qteNRJ:int = 100;
var ammoNormalEnable = false;
var upgradeMelee = true;
var durabiliter = 20;
var dommageObstacle = 20;
var dommageCollisionNME = 20;
var suivreCursor: boolean = false;
var suivreCursorTopDown: boolean = false;

//Prefab
var explosionMort:GameObject;
var multiplayerRespawnZone:GameObject;
var meleeAttackPrefab:GameObject;
var meleeAttackUpgradePrefab:GameObject;
var monProjectileSimple: GameObject;
var monProjectileTriple:GameObject;
var monMissile:GameObject;

//ANIM
var animAttaque ="slide";
var animMovement ="run";
var animIdle ="idle";
var animMort ="idle";


//variables privees
private var typeMissiles:int = 0; // TEMP
private var facteurInertie:float = 2.0f;
private var deplacementFramePrecedent:Vector3 = Vector3(0,0,0);
private var compteurTempsTir =0f;
private var compteurTempsMelee =0f;
private var limites:Vector4; //x,y,z,w : x,y :pt bas Gauche, z,w : pt haut droite Obtenu par AireDeJeu
private var modeDeJeu:Quaternion = Quaternion.Euler(0,0,0); //horizontal par defaut...a faire!
private var vecteurAutoScroll:Vector3 = Vector3(0,0,0);
private var monGameManager:scr_GameManager;
private var toutEstMortel : boolean = false;
private var meleeUpgradeDur = 20;
private var estMort: boolean;
private var mainCamera:Camera;
private var anim: Animation;

public var resetAfterDeathTime : float = 5f;                // How much time from the player dying to the level reseting.
private var timer : float;                                  // A timer for counting to the reset of the level once the player is dead.

static var checkPoint : Vector3 = Vector3(0,0,0); // exemple checkPoint

function Start(){
    anim = this.GetComponentInChildren(Animation);
    if(anim != null){
    anim.wrapMode = WrapMode.Loop;
    anim[animAttaque].wrapMode = WrapMode.Once;
    anim[animAttaque].layer = 1;
    anim[animMort].wrapMode = WrapMode.Once;
    anim.Stop();
    }
    
    estMort = false;
    
    mainCamera = GameObject.FindGameObjectWithTag("MainCamera").camera;
    
    if (checkPoint.x != 0 && checkPoint.y != 0 && checkPoint.z != 0) // exemple checkPoint
    {                                                                // exemple checkPoint
        this.transform.position = checkPoint;                        // exemple checkPoint
    }                                                                // exemple checkPoint
}

function UpdatePosition(vecteurEntree: Vector3) {
    
    //Pour rester dans l'aire de jeu
    vecteurEntree +=vecteurAutoScroll;
    if(this.transform.position.x + vecteurEntree.x < getLimites(0)){
        vecteurEntree.x =0;
    }
    if(this.transform.position.x + vecteurEntree.x > getLimites(2)){
        vecteurEntree.x =0;
    }
    if(this.transform.position.y + vecteurEntree.y < getLimites(1)){
        vecteurEntree.y =0;
    }
    if(this.transform.position.y + vecteurEntree.y > getLimites(3)){
        vecteurEntree.y =0;
    }
    
    this.transform.Translate(vecteurEntree,Space.World);
    deplacementFramePrecedent = vecteurEntree;
}

function UpdateActions(action1: boolean, action2: boolean, action3: boolean) {
    var eulerRot: Vector3 = transform.rotation.eulerAngles;
    eulerRot.z -= 90;
    var rotation: Quaternion = suivreCursorTopDown ? transform.rotation : Quaternion.Euler(eulerRot.x, eulerRot.y, eulerRot.z);

    if (action1 && compteurTempsTir >= cadence && qteAmmo > 0) {
        if(ammoNormalEnable){
            qteAmmo -= 1;
        }
        
        switch(typeLaser){
            case 0:
            Instantiate(monProjectileSimple, transform.position+Vector3(0.5,0,0), rotation);
            compteurTempsTir=0;
            if(anim != null){
                anim.CrossFade(animAttaque);
            }
            break;
            case 1:
            var proj :GameObject = Instantiate(monProjectileTriple, transform.position+Vector3(0.5,0,0), Quaternion.Euler(0,0,-30)) ;
            proj = Instantiate(monProjectileTriple, transform.position+Vector3(0.5,0,0), Quaternion.identity)  ;
            proj = Instantiate(monProjectileTriple, transform.position+Vector3(0.5,0,0), Quaternion.Euler(0,0,30)) ;
            compteurTempsTir=0;
            if(anim != null){
                anim.CrossFade(animAttaque);
            }
            break;
            
        }
    }
    
    if(action2 && qteMissiles>0){
        switch(typeMissiles){
            case 0:
            Instantiate(monMissile, transform.position+Vector3(0.5,0,0), rotation);
            if(anim != null){
                anim.CrossFade(animAttaque);
            }
            break;
        }
    }
    
    if (action3){
        if(compteurTempsMelee >= cadenceMelee  && !upgradeMelee){
            Instantiate(meleeAttackPrefab, transform.position+Vector3(0,0,0), rotation);
            compteurTempsMelee = 0;
            if(anim != null){
                anim.CrossFade(animAttaque);
            }
        }
        if(compteurTempsTir >= cadenceMelee  && upgradeMelee){
            Instantiate(meleeAttackUpgradePrefab, transform.position+Vector3(0,0,0), rotation);
            compteurTempsMelee = 0;
            meleeUpgradeDur -=1;
            if(anim != null){
                anim.CrossFade(animAttaque);
            }
            
            if(meleeUpgradeDur <= 0){
                upgradeMelee = false;
            }
        }
    }
}

function FixedUpdate () {
    //on recupere l'entree et on deplace le vaisseau
    var vecteurEntree :Vector3 = Vector3(0,0,0);
    var horizontal: boolean;
    var vertical: boolean;
    var fire1: boolean;
    var fire2: boolean;
    var fire3: boolean;
    
    if (!estMort)
    {
        if (playerIndex == 0)
        {
            horizontal = Mathf.Abs(Input.GetAxis("Horizontal")) > 0.15;
            vertical = Mathf.Abs(Input.GetAxis("Vertical")) > 0.15;
            vecteurEntree.x =  horizontal ? Input.GetAxis("Horizontal") * vitesse : deplacementFramePrecedent.x / facteurInertie;
            vecteurEntree.y =  vertical ? Input.GetAxis("Vertical") * vitesse : deplacementFramePrecedent.y / facteurInertie;
            fire1 = Input.GetButton("Fire1");
            fire2 = Input.GetButton("Fire2");
            fire3 = Input.GetButton("Fire3");
        }
        else if (playerIndex == 1)
        {
            horizontal = Mathf.Abs(Input.GetAxis("Horizontal_2")) > 0.15;
            vertical = Mathf.Abs(Input.GetAxis("Vertical_2")) > 0.15;
            vecteurEntree.x =  Mathf.Abs(Input.GetAxis("Horizontal_2"))>0.15?Input.GetAxis("Horizontal_2")*vitesse:deplacementFramePrecedent.x/facteurInertie;
            vecteurEntree.y =  Mathf.Abs(Input.GetAxis("Vertical_2"))>0.15?Input.GetAxis("Vertical_2")*vitesse:deplacementFramePrecedent.y/facteurInertie;
            fire1 = Input.GetButton("Fire1_2");
            fire2 = Input.GetButton("Fire2_2");
            fire3 = Input.GetButton("Fire3_2");
        }
        else
        {
            Debug.LogError("Invalid player index");
        }
        
        UpdatePosition(vecteurEntree);
        UpdateActions(fire1, fire2, fire3);
        AnimationManager(horizontal, vertical);
    }
    
    compteurTempsTir += 1 * Time.deltaTime;
    compteurTempsMelee += 1 * Time.deltaTime;
}

function Update(){
    if(nombreDeVie <= 0){
        if(restartCeNiveau){
            aLoaderQuandGameOver = Application.loadedLevel;
        }
        Application.LoadLevel(aLoaderQuandGameOver);
    }
    
    if (estMort){
        if(anim != null){
            if(!anim.IsPlaying(animMort)){

                //abouchar gameObject.SetActiveRecursively(false);
                gameObject.SetActive(false);
                }
        }
        else if(anim == null){
            //abouchar gameObject.SetActiveRecursively(false);
            gameObject.SetActive(false);
        }
    }
    
    if (suivreCursor && playerIndex == 0)
    {
        var point: Vector3 = this.mainCamera.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, mainCamera.farClipPlane));
        var angle: float;
    
        if (suivreCursorTopDown)
        {
            point.z = 0;
            var playerToMouse: Vector3 = point - this.transform.position;
            playerToMouse.Normalize();
            angle = Mathf.Acos(Vector3.Dot(playerToMouse, Vector3(1, 0, 0))) * Mathf.Rad2Deg;
            if (point.y < 0) angle = -angle;
            
            this.transform.rotation.eulerAngles.z = angle;
        }
        else 
        {
            angle = point.x > transform.position.x ? 0 : 180;
            this.transform.rotation.eulerAngles.y = angle;
        }
    }
}

function setLimites(x1,y1,x2,y2){
    limites = Vector4(x1,y1,x2,y2);
}

function getLimites(valeur){

    var limit: float;
    
    switch (valeur){
        case 0:
            limit = limites.x;
            break;
        case 1:
            limit = limites.y;
            break;
        case 2:
            limit = limites.z;
            break;
        case 3:
            limit = limites.w;
            break;
        default:
            limit = limites.x;
    }
    
    return limit;
}
function setAutoScroll(value:float){
    vecteurAutoScroll = Vector3(value,0,0);
}

function Detruit() {

    if(monGameManager.vaisseaux.Count > 1){
        var respawnZone = Instantiate(multiplayerRespawnZone,this.transform.position, Quaternion.identity);
        respawnZone.GetComponent(scr_respawnZoneManager).playerToRespawn = gameObject;
    }
    Instantiate(explosionMort,this.transform.position, Quaternion.identity);
    if(anim != null){
    anim.CrossFade(animMort);
    }

    var fader = FindObjectOfType(screenFader);

    fader.fadeSpeed = 0.5;

    fader.EndScene();
    
    // Increment the timer.
//    timer += Time.deltaTime;

    //If the timer is greater than or equal to the time before the level resets...
//    if(timer >= resetAfterDeathTime)
//    {
//        estMort = true;
    
//        monGameManager.VaisseauMort(playerIndex);
//    }
}

function Ressucite() {

    nombreDeVie -= 1;
    estMort = false;
//abouchar    this.gameObject.SetActiveRecursively(true);
    this.gameObject.SetActive(true);
    
    var health = GetComponent(scr_PlayerHealth);
    health.Reset();
}
function OnTriggerEnter(other:Collider){
    if(other.tag == "Mortel"){
        
        this.GetComponent(scr_PlayerHealth).curHealth -= dommageObstacle;
    }
    if(other.tag == "NME"){
        this.GetComponent(scr_PlayerHealth).curHealth -= dommageCollisionNME;
    }
    if((other.tag != "Bonus" && other.tag != "Trigger") && toutEstMortel){
        
        Detruit();
    }
}

function SetGameManager(manager:scr_GameManager){
    monGameManager = manager;
    monGameManager.SetRotationPerso(this.transform.rotation);
}

function SetToutEstMortel(valeur : boolean){
    toutEstMortel = valeur;
}
// CALLER FCT POUR UPGRADER
function MeleeUpgrade(){
    upgradeMelee = true;
    meleeUpgradeDur = durabiliter;
}

function AnimationManager(horizontal: boolean, vertical: boolean){
    if(anim != null){
        if (horizontal || vertical){
            anim.CrossFade(animMovement);
        }
        else {
            anim.CrossFade(animIdle);
        }
    }
}

function EstMort() {
    return estMort;
}