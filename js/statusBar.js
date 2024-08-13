/* bottom status bar */

class cStatusBar
{
    constructor(theGui)
    {
        this.guiPtr=theGui;
        this.priority=10000;
        this.windowTitle="TheStatusBar";
        this.drawState=0; // 0: all blacks
        this.initialAnimCounter=0;
    }

    update()
    {
        if (this.drawState==1)
        {
            this.initialAnimCounter+=3;
        }
    }

    handleMessage(msgType,msgPayload)
    {
    }

    draw(fb)
    {
        if (this.drawState==0)
        {
            fb.drawHorizontalLine(fb.numRows-1,0,fb.numCols,"\u2588","black","black");
            return;
        }

        fb.drawHorizontalLine(fb.numRows-1,0,fb.numCols,"\u2588","lightgray","lightgray");

        fb.printString(1,fb.numRows-1,"F1","lightgray","red");
        fb.printString(4,fb.numRows-1,"Help","lightgray","black");

        fb.printString(fb.numCols-13,fb.numRows-1,"friolOS 0.1b","lightgray","black");

        if (this.drawState==1)
        {
            fb.drawHorizontalLine(fb.numRows-1,this.initialAnimCounter,fb.numCols,"\u2588","black","black");
        }
    }
}
