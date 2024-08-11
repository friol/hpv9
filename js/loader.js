/* loader Window */

class cLoader extends cWindow
{
    constructor(px,py,title,dimx,dimy,bgColor,parentGui)
    {
        super(px,py,title,dimx,dimy,bgColor,parentGui);

        this.animCounter=0;
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
            "Inverting entrophy...",
            "Defragmenting your hard drive...",
            "Done!",
        ]

        var tagnum;
        if (this.animCounter<100) tagnum=0;
        else if (this.animCounter<200) tagnum=1;
        else if (this.animCounter<300) tagnum=2;
        else if (this.animCounter<400) tagnum=3;
        else if (this.animCounter<500) tagnum=4;
        else tagnum=5;

        const cx=(this.width-tags[tagnum].length)>>1;
        const cy=this.height>>1;

        const spinner=["/","-","\\","|"]
        fb.printString(this.posx+cx,this.posy+cy,tags[tagnum],this.bgColor,"yellow");
        fb.printString(this.posx+cx+tags[tagnum].length+1,this.posy+cy,spinner[(this.animCounter>>2)%4],this.bgColor,"yellow");
    }
}
