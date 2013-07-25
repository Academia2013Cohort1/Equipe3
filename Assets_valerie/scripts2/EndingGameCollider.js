#pragma strict

private var endAnimation: Animation;
private var endAnimationInProgress = false;
private var endAnimationTime: float = 0;

var animFin = "none";

function Start () 
{
	endAnimation = this.GetComponentInChildren(Animation);
	
	if (endAnimation != null)
	{
		endAnimation.wrapMode = WrapMode.Loop;
		endAnimation[animFin].wrapMode = WrapMode.Once;
		endAnimation[animFin].wrapMode = WrapMode.Once;
		endAnimation[animFin].layer = 1;
		endAnimation.Stop();
	}
}

function Update () 
{
	if (endAnimationInProgress)
	{
		endAnimationTime -= Time.deltaTime;
		
		if (endAnimationTime <= 0)
		{
			endAnimationInProgress = false;
			endAnimationTime = 0;
			Application.LoadLevel(1);
		}
	}
}

function OnTriggerEnter(other:Collider)
{
	if (other.tag == "Player")
	{
		endAnimationInProgress = true;
		endAnimationTime = 5;
		endAnimation.CrossFade(animFin);
	}
}
