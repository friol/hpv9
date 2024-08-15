/* welcome back to MS-DOS */

var glbGui;
//var glbDesktop;
//var glbMenuBar;
//var glbStatusBar;

var glbFrameBuffer;

// fps calculon
var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;
var fpsArray=new Array();

//
//
//

function animate()
{
    glbGui.update();
    glbGui.draw(glbFrameBuffer);

    glbFrameBuffer.blit();

    // calc fps
    var thisFrameTime = (thisLoop=new Date) - lastLoop;
    frameTime+= (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;

    var fpsOut = document.getElementById('fpsSpan');
    var fpeez=parseInt((1000/frameTime).toFixed(1));
    fpsOut.innerHTML = fpeez + " fps";

    window.requestAnimationFrame(animate);
}

function mouseMove(evt)
{
    const rect = document.getElementById("mainDiv").getBoundingClientRect();
    const mousex=evt.clientX-rect.left;
    const mousey=evt.clientY-rect.top;

    glbGui.storeMousePos(mousex,mousey,glbFrameBuffer);
    glbGui.handleMessage(messageTypesEnum.MSG_MOUSEMOVE,[Math.floor(mousex/glbFrameBuffer.fontxsize),Math.floor(mousey/glbFrameBuffer.fontysize)]);
}

function myOnClick(evt)
{
    const rect = document.getElementById("mainDiv").getBoundingClientRect();
    var mousex,mousey;

    if (evt.targetTouches)
    {
        mousex=evt.targetTouches[0].clientX-rect.left;
        mousey=evt.targetTouches[0].clientY-rect.top;
    }
    else
    {
        mousex=evt.clientX-rect.left;
        mousey=evt.clientY-rect.top;
    }

    glbGui.handleMessage(messageTypesEnum.MSG_MOUSECLICK,[Math.floor(mousex/glbFrameBuffer.fontxsize),Math.floor(mousey/glbFrameBuffer.fontysize)]);
}

function mouseUp(evt)
{
    const rect = document.getElementById("mainDiv").getBoundingClientRect();
    const mousex=evt.clientX-rect.left;
    const mousey=evt.clientY-rect.top;

    glbGui.handleMessage(messageTypesEnum.MSG_MOUSEUNCLICK,[Math.floor(mousex/glbFrameBuffer.fontxsize),Math.floor(mousey/glbFrameBuffer.fontysize)]);
}

function setup()
{
    var w = window.innerWidth;
    var h = window.innerHeight;
    glbFrameBuffer=new cFrameBuffer(w,h,"mainDiv");

    glbGui=new cGui();

    //const loaderWidth=50; const loaderHeight=10;
    //const loaderX=(glbFrameBuffer.numCols-loaderWidth)>>1;
    //const loaderY=(glbFrameBuffer.numRows-loaderHeight)>>1;
    //var loaderWindow=new cLoader(loaderX,loaderY,"Loading",loaderWidth,loaderHeight,"#c02020",glbGui);
    //glbGui.addComponent(loaderWindow);
    glbGui.activate();

    document.getElementById("mainDiv").addEventListener("mousemove", mouseMove);
    document.getElementById("mainDiv").addEventListener("touchmove", mouseMove);
	document.getElementById("mainDiv").onmousedown=function(e) { myOnClick(e); };
	document.getElementById("mainDiv").addEventListener("touchstart", myOnClick);
	document.getElementById("mainDiv").onmouseup=function(e) { mouseUp(e); };
	document.getElementById("mainDiv").addEventListener("touchend", mouseUp);

    document.addEventListener('keydown', function(event) 
    {
        glbGui.handleMessage(messageTypesEnum.MSG_KEYDOWN,[event.key]);
        //console.log(event.key+" pressed");
    }, false);

    document.getElementById('mainDiv').style.cursor = 'none';

    animate();
}

window.onload = (event) => 
{
    setup();
};
