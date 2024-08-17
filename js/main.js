/* welcome back to MS-DOS */

var glbGui;
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

    //console.log("mousemove");
}

function mouseUp(evt)
{
    const rect = document.getElementById("mainDiv").getBoundingClientRect();
    const mousex=evt.clientX-rect.left;
    const mousey=evt.clientY-rect.top;

    glbGui.handleMessage(messageTypesEnum.MSG_MOUSEUNCLICK,[Math.floor(mousex/glbFrameBuffer.fontxsize),Math.floor(mousey/glbFrameBuffer.fontysize)]);
    //console.log("mouseup");
}

function setup()
{
    var w = window.innerWidth;
    var h = window.innerHeight;
    glbFrameBuffer=new cFrameBuffer(w,h,"mainDiv");

    glbGui=new cGui(glbFrameBuffer);

    //const loaderWidth=50; const loaderHeight=10;
    //const loaderX=(glbFrameBuffer.numCols-loaderWidth)>>1;
    //const loaderY=(glbFrameBuffer.numRows-loaderHeight)>>1;
    //var loaderWindow=new cLoader(loaderX,loaderY,"Loading",loaderWidth,loaderHeight,"#c02020",glbGui);
    //glbGui.addComponent(loaderWindow);
    glbGui.activate();

    var hammertime = new Hammer(document.getElementById("mainDiv"), {});

    hammertime.on('tap', function(ev) 
    {
        if (ev.pointerType=="mouse") return;

        const rect = document.getElementById("mainDiv").getBoundingClientRect();
        var tapx,tapy;
    
        tapx=ev.center.x-rect.left;
        tapy=ev.center.y-rect.top;
    
        glbGui.handleMessage(messageTypesEnum.MSG_MOUSECLICK,[Math.floor(tapx/glbFrameBuffer.fontxsize),Math.floor(tapy/glbFrameBuffer.fontysize)]);
        //console.log("tap");
    });

    hammertime.on("hammer.input", function(ev) {
        if ((ev.pointerType=="mouse")&&(ev.pointers[0].type=="pointerdown"))
        {
            const rect = document.getElementById("mainDiv").getBoundingClientRect();
            var mousex,mousey;
        
            mousex=ev.center.x-rect.left;
            mousey=ev.center.y-rect.top;
        
            glbGui.handleMessage(messageTypesEnum.MSG_MOUSECLICK,[Math.floor(mousex/glbFrameBuffer.fontxsize),Math.floor(mousey/glbFrameBuffer.fontysize)]);
            //console.log("hammer mouse click");
        }
     });

    hammertime.on('pan', function(ev) 
    {
        if (ev.pointerType=="mouse") return;

        const rect = document.getElementById("mainDiv").getBoundingClientRect();
        var mousex,mousey;
    
        mousex=ev.center.x-rect.left;
        mousey=ev.center.y-rect.top;

        if (!ev.isFinal) 
        {
            glbGui.handleMessage(messageTypesEnum.MSG_MOUSECLICK,[Math.floor(mousex/glbFrameBuffer.fontxsize),Math.floor(mousey/glbFrameBuffer.fontysize)]);
        }
        else glbGui.handleMessage(messageTypesEnum.MSG_MOUSEUNCLICK,[Math.floor(mousex/glbFrameBuffer.fontxsize),Math.floor(mousey/glbFrameBuffer.fontysize)]);

        glbGui.handleMessage(messageTypesEnum.MSG_MOUSEMOVE,[Math.floor(mousex/glbFrameBuffer.fontxsize),Math.floor(mousey/glbFrameBuffer.fontysize)]);

        console.log(ev);
    });

    document.getElementById("mainDiv").addEventListener("mousemove", mouseMove);
    document.getElementById("mainDiv").onmouseup=function(e) { mouseUp(e); };

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
