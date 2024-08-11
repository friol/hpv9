/* debug window */

class cDebugWin extends cWindow
{
    constructor(px,py,title,dimx,dimy,bgColor,parentGui)
    {
        super(px,py,title,dimx,dimy,bgColor,parentGui);
    }

    handleMessage(msgType,msgPayload)
    {
        super.handleMessage(msgType,msgPayload);
    }

    update()
    {
        super.update();
    }

    draw(fb)
    {
        super.draw(fb);
        if (this.displayPhase==0) return;

        var row=1;
        for (var cmp=0;cmp<this.parentGui.listOfComponents.length;cmp++)
        {
            if (this.parentGui.listOfComponents[cmp].windowTitle)
            {
                fb.printString(this.posx+1,this.posy+row,this.parentGui.listOfComponents[cmp].windowTitle,this.bgColor,"yellow");
                fb.printString(this.posx+20,this.posy+row,""+this.parentGui.listOfComponents[cmp].priority,this.bgColor,"yellow");
                row++;
            }
        }

    }
}
