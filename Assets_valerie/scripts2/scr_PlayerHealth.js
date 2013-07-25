#pragma strict


var maxHealth:float = 1000;
var curHealth:float = 0;
var textureBarreContour:Texture;
var textureBarreInterieur:Texture;
var textureBarreInterieur1:Texture;
var textureBarreInterieur2:Texture;
var textureBarreInterieur3:Texture;
var textureBarreInterieur4:Texture;
var textureBarreInterieur5:Texture;
var barDeViePrefab : GameObject;
var GUIbar = true;
var inGameBar = false;

function Start(){
	if(inGameBar){
		var healthBar = Instantiate(barDeViePrefab, transform.position+Vector3(0,1,0), Quaternion.identity);
		healthBar.transform.parent = transform;
		healthBar.transform.localScale.x = maxHealth/maxHealth;
	}
	curHealth = maxHealth;

	}

function OnGUI(){
    if(GUIbar){
    GUI.BeginGroup(Rect(Screen.width - 200, 0, 200, 50));
    //GUI.DrawTexture(Rect(0,0,200, 50),textureBarreContour,ScaleMode.StretchToFill,true, 0);
    //GUI.DrawTexture(Rect(0,0,100*curHealth/maxHealth, 25), textureBarreInterieur, ScaleMode.ScaleAndCrop,true,0);
    if (100*curHealth/maxHealth > 80)
    {
        GUI.DrawTexture(Rect(0,0,200, 50), textureBarreInterieur, ScaleMode.ScaleAndCrop,true,0);
    }
    else if (100*curHealth/maxHealth > 60)
    {
        GUI.DrawTexture(Rect(0,0,200, 50), textureBarreInterieur1, ScaleMode.ScaleAndCrop,true,0);
    }
    else if (100*curHealth/maxHealth > 40)
    {
        GUI.DrawTexture(Rect(0,0,200, 50), textureBarreInterieur2, ScaleMode.ScaleAndCrop,true,0);
    }
    else if (100*curHealth/maxHealth > 20)
    {
        GUI.DrawTexture(Rect(0,0,200, 50), textureBarreInterieur3, ScaleMode.ScaleAndCrop,true,0);
    }
    else if (100*curHealth/maxHealth > 0)
    {
        GUI.DrawTexture(Rect(0,0,200, 50), textureBarreInterieur4, ScaleMode.ScaleAndCrop,true,0);
    }
    else 
    {
        GUI.DrawTexture(Rect(0,0,200, 50), textureBarreInterieur5, ScaleMode.ScaleAndCrop,true,0);
    }
    
    GUI.EndGroup();
    }
}

function Reset() {
	curHealth = maxHealth;
}

function Update () {

	var vaisseau = gameObject.GetComponent(scr_VaisseauAvatar);

	if (curHealth <= 0 && !vaisseau.EstMort()) 
	{
		vaisseau.Detruit();
    } 
}
function OnTriggerEnter(other:Collider)
{
	if(other.tag =="NME")
	{
		curHealth = curHealth - 20*maxHealth/100 ;
		
		//other.GetComponent(scr_VaisseauNMEVolant).vitesse *= -1;
	}
}
