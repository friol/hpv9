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
            "Generating spline coordinates...",
            "Enumerating the universe's atoms...",
            "Inverting entropy...",
            "Defragmenting your hard drive...",
            "Done!",
            "Done!",
            "You can close this window now...",
            "I said you can close it...",
            "Yep, it's that green square on the left..."
        ]

        var tagnum;
        if (this.animCounter<100) tagnum=0;
        else if (this.animCounter<200) tagnum=1;
        else if (this.animCounter<300) tagnum=2;
        else if (this.animCounter<400) tagnum=3;
        else if (this.animCounter<500) tagnum=4;
        else if (this.animCounter==500)
        {
            this.activationTriggered=true;
            this.parentGui.activate();
            tagnum=5;
        }
        else if (this.animCounter<600) tagnum=6;
        else if (this.animCounter<700) tagnum=7;
        else if (this.animCounter<800) tagnum=8;
        else tagnum=9;

        const cx=(this.width-tags[tagnum].length)>>1;
        const cy=this.height>>1;

        const spinner=["/","-","\\","|"]
        fb.printString(this.posx+cx,this.posy+cy,tags[tagnum],this.bgColor,"yellow");
        fb.printString(this.posx+cx+tags[tagnum].length+1,this.posy+cy,spinner[(this.animCounter>>2)%4],this.bgColor,"yellow");
    }
}
