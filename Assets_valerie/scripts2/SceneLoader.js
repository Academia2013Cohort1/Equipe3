#pragma strict
enum LoadMode{
	Automatic = 0,
	Boutton = 1,
	ClickObject = 2,
	TriggerArea = 3
}
var levelToLoad = 0;
var quitteLeJeu = false;
var LoadSysteme:LoadMode;
var bouttonName = "escape";
var AttendreAvantDeLoader = 1.0;
private var click = false;
private var trigger = false;
function Start () {

}

function Update () {
	switch (LoadSysteme){
			case 0:
			Auto();
			break;
			case 1:
			BouttonFct();
			break;
			case 2:
			click = true;
			break;
			case 3:
			trigger = true;
			break;
	}
}

function OnMouseUp(){
	if(click){
		yield WaitForSeconds (AttendreAvantDeLoader);
		if(quitteLeJeu){
			Application.Quit();
		}
		else{
			Application.LoadLevel(levelToLoad);
		}
	}
}

function Auto(){
	yield WaitForSeconds (AttendreAvantDeLoader);
		if(quitteLeJeu){
			Application.Quit();
		}
		else{
			Application.LoadLevel(levelToLoad);
		}
}

function BouttonFct(){
	if(Input.GetKeyDown(bouttonName)){
		yield WaitForSeconds (AttendreAvantDeLoader);
		if(quitteLeJeu){
			Application.Quit();
		}
		else{
			Application.LoadLevel(levelToLoad);
		}
	}
}

function OnTriggerEnter( other : Collider){
	if(trigger && other.tag == "Player"){
		yield WaitForSeconds (AttendreAvantDeLoader);
		if(quitteLeJeu){
			Application.Quit();
		}
		else{
			Application.LoadLevel(levelToLoad);
		}
	}
}