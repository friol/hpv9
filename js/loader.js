/* loader Window */

class cLoader extends cWindow
{
    constructor(px,py,title,dimx,dimy,bgColor,parentGui)
    {
        super(px,py,title,dimx,dimy,bgColor,parentGui);

        this.animCounter=0;
        this.activationTriggered=false;
    }

    handleMessage(msgType,msgPayload)
    {
        super.handleMessage(msgType,msgPayload);
    }

    update()
    {
        super.update();

        this.animCounter+=1;
    }

    draw(fb)
    {
        super.draw(fb);

        if (this.displayPhase==0) return;

        const tags=[
            "Loading dantonag.it...",
            "Enumerating universe's atoms...",
            "Inverting entropy...",
            "Defragmenting hard drive...",
            "Done!",
            "Done!",
            "You can close this window now",
            "You can close this window now",
            "I said you can close it",
            "I said you can close it",
            "That square on the left...",
            "Yes that one...",
            "Click it...",
            "Click it click it click it...",
            "Ok I give up...",
            "CLICK IT!",
            "GOOOO!",
            "Ok I give up for real...",
            "I SAID CLICK IT!",
            "Ok, nervermind."
        ]

        var tagnum=tags.length-1;
        var baseVal=80; var baseInc=80;
        for (var e=0;e<tags.length;e++)
        {
            if (this.animCounter<baseVal) { tagnum=e; break; }
            else baseVal+=baseInc;

            if (this.animCounter==(baseVal+(baseInc*3)))
            {
                this.activationTriggered=true;
                this.parentGui.activate();
            }
        }

        const cx=(this.width-tags[tagnum].length)>>1;
        const cy=this.height>>1;

        const spinner=["/","-","\\","|"]
        fb.printString(this.posx+cx,this.posy+cy,tags[tagnum],this.bgColor,"yellow");
        fb.printString(this.posx+cx+tags[tagnum].length+1,this.posy+cy,spinner[(this.animCounter>>2)%4],this.bgColor,"yellow");
    }
}
