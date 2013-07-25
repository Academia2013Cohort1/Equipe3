#pragma strict
var isQuitButton = false;

 

function OnMouseEnter()

 

{

 

renderer.material.color = Color.red; //change the color of the text

 

}

 

function OnMouseExit()

 

{ renderer.material.color = Color.yellow; //change the colorï»¿ of the text

 

}

 

function OnMouseUp()

{

    //Are We Dealing With A Quit Button

    if( isQuitButton )

    {

        //QuitTheGame

        Application.Quit();

    }

    else

    {

        //LoadTheGame

        Application.LoadLevel(1);

    }

}