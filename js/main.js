/* welcome back to MS-DOS */

var glbGui;
var glbDesktop;
var glbMenuBar;

var glbFrameBuffer;

function animate()
{
    glbGui.draw(glbFrameBuffer);

    glbFrameBuffer.blit();

    window.requestAnimationFrame(animate);
}

function mouseMove(evt)
{
    const rect = document.getElementById("mainDiv").getBoundingClientRect();
    const mousex=evt.clientX-rect.left;
    const mousey=evt.clientY-rect.top;

    glbGui.storeMousePos(mousex,mousey,glbFrameBuffer);
}

function setup()
{
    var w = window.innerWidth;
    var h = window.innerHeight;
    glbFrameBuffer=new cFrameBuffer(w,h,"mainDiv");

    glbGui=new cGui();
    glbDesktop=new cDesktop();
    glbGui.addComponent(glbDesktop);
    glbMenuBar=new cMenuBar();
    glbGui.addComponent(glbMenuBar);

    document.getElementById("mainDiv").addEventListener("mousemove", mouseMove);
    document.getElementById('mainDiv').style.cursor = 'none';

    animate();
}

window.onload = (event) => 
{
    setup();
};
