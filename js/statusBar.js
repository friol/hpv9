/* bottom status bar */

class cStatusBar
{
    constructor(theGui)
    {
        this.guiPtr=theGui;
        this.priority=10000;
    }

    update()
    {
    }

    handleMessage(msgType,msgPayload)
    {
    }

    draw(fb)
    {
        fb.drawHorizontalLine(fb.numRows-1,0,fb.numCols,"\u2588","lightgray","lightgray");

        fb.printString(1,fb.numRows-1,"F1","lightgray","red");
        fb.printString(4,fb.numRows-1,"Help","lightgray","black");

        fb.printString(fb.numCols-13,fb.numRows-1,"friolOS 0.1b","lightgray","black");
    }
}
