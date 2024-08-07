/* cbutt */

class cButton
{
    constructor(px,py,label,bgColor,buttColor,textColor,parentx,parenty,pressedFun,parentCaller)
    {
        this.posx=px;
        this.posy=py;
        this.label=label;
        this.bgColor=bgColor;
        this.buttonColor=buttColor;
        this.textColor=textColor;

        this.parentx=parentx;
        this.parenty=parenty;

        this.pressed=false;
        this.pressedFunction=pressedFun;
        this.parentCaller=parentCaller;
    }

    handleMessage(msgType,msgPayload)
    {
        if (msgType==messageTypesEnum.MSG_MOUSECLICK)
        {
            const mousex=msgPayload[0];
            const mousey=msgPayload[1];

            if ((mousey==(this.posy+this.parenty)))
            {
                if ((mousex>=(this.posx+this.parentx-2))&&(mousex<(this.posx+this.parentx+this.label.length+2)))
                {
                    this.pressed=true;
                }
            }
            else
            {
                this.pressed=false;
            }
        }
        else if (msgType==messageTypesEnum.MSG_MOUSEUNCLICK)
        {
            if (this.pressed)
            {
                // omg this is a button press
                this.pressedFunction(this.parentCaller);
            }
            this.pressed=false;
        }
    }

    updateParentPos(newpx,newpy)
    {
        this.parentx=newpx;
        this.parenty=newpy;
    }

    draw(fb)
    {
        if (!this.pressed)
        {
            fb.drawHorizontalLine(this.posy+this.parenty,this.posx+this.parentx-2,this.posx+this.parentx+this.label.length+2,"\u2588",this.buttonColor,this.buttonColor);
            fb.putPixel(this.posy+this.parenty,this.posx+this.parentx+this.label.length+2,"▄",this.bgColor,"black");
            fb.drawHorizontalLine(this.posy+this.parenty+1,this.posx+this.parentx-1,this.posx+this.parentx+this.label.length+3,"▀",this.bgColor,"black");
            fb.printString(this.posx+this.parentx,this.posy+this.parenty,this.label,this.buttonColor,this.textColor);
        }
        else
        {
            fb.drawHorizontalLine(this.posy+this.parenty,this.posx+this.parentx-1,this.posx+this.parentx+this.label.length+3,"\u2588",this.buttonColor,this.buttonColor);
            fb.printString(this.posx+this.parentx+1,this.posy+this.parenty,this.label,this.buttonColor,this.textColor);
        }
    }
}
