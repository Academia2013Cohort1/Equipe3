#pragma strict

import System.Collections.Generic;

var mainCamera:scr_Camera;
var modeleAvatar:GameObject;
var autoScroll:float = 0f;
var toutEstMortel : boolean = false;
var deadPosition : Vector3;
var utiliserScore = true;
var joueurPeuxRessuciter = true;
var gameOverScreenID = 1;

//Private
private var score:int=0;
private var rotationRespawn:Quaternion;
private var limitesVaisseau:Vector4;
private var avatarStart:scr_VaisseauAvatar;
var vaisseaux: Dictionary.<int, scr_VaisseauAvatar>;
private var nbVaisseauxMorts: int;
private var vaisseauRespawns: List.<scr_VaisseauAvatar>;
private var scoreForHealth:int=0;

function Start(){

	vaisseaux = new Dictionary.<int, scr_VaisseauAvatar>();
	vaisseauRespawns = new List.<scr_VaisseauAvatar>();
	
	var playerObjects = GameObject.FindGameObjectsWithTag("Player");
	var playerCount = playerObjects.length;
	for (var i = 0; i < playerCount; ++i)
	{
		var vaisseau = playerObjects[i].GetComponent(scr_VaisseauAvatar);
		vaisseau.SetGameManager(this);
		vaisseau.SetToutEstMortel(toutEstMortel);
		vaisseaux.Add(vaisseau.playerIndex, vaisseau);
		
		if (vaisseau.playerIndex == 0)
		{
			avatarStart = vaisseau;
		}
	}
	
	mainCamera.SetShipToFollow(avatarStart);
	mainCamera.AutoScroll(autoScroll/25);
}

function Update()
{
	for (var i = vaisseauRespawns.Count - 1; i >= 0; --i)
	{
		var vaisseau = vaisseauRespawns[i];
		var animMort = vaisseau.GetComponent(scr_VaisseauAvatar).animMort;
		if(vaisseau.GetComponentInChildren(Animation) != null){
			if (!vaisseau.GetComponent(Animation).IsPlaying(animMort))
			{
				Debug.Log(vaisseau.gameObject.name);
				if(joueurPeuxRessuciter && vaisseaux.Count == 1){
				vaisseau.Ressucite();
				}
				else{
					Application.LoadLevel(gameOverScreenID);
				}
				mainCamera.AutoScroll(autoScroll/25);
				vaisseauRespawns.RemoveAt(i);
			}
		}
		else if(vaisseau.GetComponentInChildren(Animation) == null){
			Debug.Log(vaisseau.gameObject.name);
				if(joueurPeuxRessuciter && vaisseaux.Count == 1){
				vaisseau.Ressucite();
				}
				else{
					Application.LoadLevel(gameOverScreenID);
				}
				mainCamera.AutoScroll(autoScroll/25);
				vaisseauRespawns.RemoveAt(i);
		}
	}
}

function OnGUI(){
	if(utiliserScore){
	GUI.Box(Rect(0,0,100,100),"Score : " + score);
	GUI.BeginGroup(Rect(Screen.width - 100, 0, 100, 25));
	GUI.EndGroup();
	}
}

function VaisseauMort(playerIndex: int){
	
	++nbVaisseauxMorts;
	
	
	// GAME OVER!
	if (nbVaisseauxMorts == vaisseaux.Count)
	{
		nbVaisseauxMorts = 0;
		
		for (var i = 0; i < vaisseaux.Count; ++i) vaisseauRespawns.Add(vaisseaux[i]);
		mainCamera.AutoScroll(0);
	}
}

/*
function RespawnVaisseau(var playerIndex: int){
	
	var vecteurRespawnTemp:Vector3 = deadPosition;
	vecteurRespawnTemp.z = 0;
	var tempGameObject:GameObject;
	tempGameObject = Instantiate(modeleAvatar, vecteurRespawnTemp, rotationRespawn);
	avatarStart = tempGameObject.GetComponent(scr_VaisseauAvatar) ;
	avatarStart.setLimites(limitesVaisseau.x,limitesVaisseau.y,limitesVaisseau.z,limitesVaisseau.w);
	mainCamera.SetShipToFollow(avatarStart);
	mainCamera.AutoScroll(autoScroll/25);
	mainCamera.player = tempGameObject;
	avatarStart.SetGameManager(this);
}
*/

function SetRotationPerso(rotation:Quaternion){
	rotationRespawn = rotation;
}
function SetLimitesVaisseau(limites:Vector4){
	limitesVaisseau=limites;
}

function AjouterScore(valeur:int){
	score +=valeur;
	
	scoreForHealth +=valeur;
	
	if (scoreForHealth >= 50) 
	{
		scoreForHealth = 0;
		var player = FindObjectOfType(scr_PlayerHealth);
		player.curHealth += 20* player.maxHealth/100;
		
		if (player.curHealth > player.maxHealth) 
		{
			player.curHealth = player.maxHealth;
		}
	}
}