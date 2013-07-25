#pragma strict

// Pour l<exemple de checkPoint je suppose que le collectible est un check-point

var valeur:int =10;
private var monManager:scr_GameManager;
private var monPlayer:scr_VaisseauAvatar;    // exemple checkPoint

function Start(){
    monManager = GameObject.FindGameObjectWithTag("Manager").GetComponent(scr_GameManager);
    monPlayer = GameObject.FindObjectOfType(scr_VaisseauAvatar); // exemple checkPoint
}
function OnTriggerEnter(other:Collider){
    
    if(other.tag == "Player"){
        monManager.AjouterScore(valeur);
        Destroy(this.gameObject);
        
        monPlayer.checkPoint = monPlayer.transform.position; // exemple checkPoint
    }
}