/* help! I need somebody help! not just anybody */

class cHelpWindow extends cWindow
{
    constructor(px,py,title,dimx,dimy,bgColor,parentGui)
    {
        super(px,py,title,dimx,dimy,bgColor,parentGui);

        this.helpText=" <br> Hello! <br> If you are reading this, you have pressed F1. "+
        "So how can you be not totally lost here? Well, this is an old text-based GUI, "+
        "something that was the hype in mid 90s, before the *bitmapped* GUIs took the stage. <br> "+
        "In my opinion, this is fascinating and quite versatile. I wrote a lot of C++ programs "+
        "in a GUI like this one (compiling took more than 2 minutes, but this is another story). <br> "+
        "Feel free to browse around, and visit the bunch of links in the above menu. <br> "+
        "Ah, to close this window, push the little green square above on the left. But you already "+
        "knew that, huh? <br> "+
        "Friol signin' off. <br> ";
    }

    handleMessage(msgType,msgPayload)
    {
        super.handleMessage(msgType,msgPayload);
    }

    update()
    {
        super.update();

    }

    printHelpMessage(fb)
    {
        const maxChars=this.width-2;
        var lineNum=0;
        var wordArr=this.helpText.split(" ");
        var curLine=wordArr[0];
        var spitOut=false;
        for (var w=1;w<wordArr.length;w++)
        {
            if (((curLine+" "+wordArr[w]).length<maxChars)&&(!spitOut))
            {
                if (wordArr[w]=="<br>") spitOut=true;
                else curLine+=" "+wordArr[w];
            }
            else
            {
                fb.printString(this.posx+2,this.posy+1+lineNum,curLine,this.bgColor,"yellow");
                curLine=wordArr[w];
                lineNum+=1;
                spitOut=false;
            }
        }
    }

    draw(fb)
    {
        super.draw(fb);

        if (this.displayPhase==0) return;

        this.printHelpMessage(fb);

    }
}
