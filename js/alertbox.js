/* alertbox */

class cAlertBox
{
    constructor(okButton,okButtonText,cancelButton,cancelButtonText,windowTitle,text,wx,wy,posx,posy,parentGui)
    {
        this.parentGui=parentGui;

        this.hasOkButton=okButton;
        this.okButtonText=okButtonText;
        this.hasCancelButton=cancelButton;
        this.cancelButtonText=cancelButtonText;
        this.windowTitle=windowTitle;
        this.windowText=text;

        this.width=wx;
        this.height=wy;

        this.posx=posx;
        this.posy=posy;

        this.dragging=false;
        this.dragPointx=-1;
        this.dragPointy=-1;

        this.deletionFlag=false;

        if (this.hasOkButton)
        {
            const txtLen=this.okButtonText.length;
            const horzPos=((this.width-txtLen)>>1);
            const vertPos=this.windowText.length+3;
            this.okButton=new cButton(horzPos,vertPos,this.okButtonText,"#b0b0b0","#00A800","white",this.posx,this.posy,this.onOkButt,this);
        }

        this.priority=-1;
    }

    onOkButt(parent)
    {
        parent.deletionFlag=true;
    }

    handleMessage(msgType,msgPayload)
    {
        if (msgType==messageTypesEnum.MSG_MOUSECLICK)
        {
            const mousex=msgPayload[0];
            const mousey=msgPayload[1];

            if (mousey==this.posy)
            {
                if ((mousex>=this.posx)&&(mousex<(this.posx+this.width)))
                {
                    if (mousex==(this.posx+4))
                    {
                        // close box
                        //console.log("I will be closed");
                        this.deletionFlag=true;
                    }
                    else
                    {
                        this.dragging=true;
                        this.dragPointx=mousex;
                        this.dragPointy=mousey;

                        this.parentGui.makeFrontmost(this.priority);
                    }
                }
            }
        }
        else if (msgType==messageTypesEnum.MSG_MOUSEUNCLICK)
        {
            this.dragging=false;
        }
        else if (msgType==messageTypesEnum.MSG_MOUSEMOVE)
        {
            const mousex=msgPayload[0];
            const mousey=msgPayload[1];

            if (this.dragging)
            {
                const deltax=mousex-this.dragPointx;
                const deltay=mousey-this.dragPointy;

                this.posx+=deltax; this.posy+=deltay;
                this.okButton.updateParentPos(this.posx,this.posy);

                this.dragPointx=mousex;
                this.dragPointy=mousey;
            }
        }

        this.okButton.handleMessage(msgType,msgPayload);
    }

    update()
    {
    }

    draw(fb)
    {
        const bgColor="#b0b0b0";
        var contourColor="white";
        if (this.dragging) contourColor="#00A800";
        // solid background
        for (var row=this.posy;row<(this.posy+this.height);row++)
        {
            fb.drawHorizontalLine(row,this.posx,this.posx+this.width,"█",bgColor,bgColor);
        }

        // contour
        for (var row=this.posy;row<(this.posy+this.height);row++)
        {
            if (row==this.posy)
            {
                fb.putPixel(row,this.posx,"╔",bgColor,contourColor);

                for (var col=this.posx+1;col<(this.posx+this.width-1);col++)
                {
                    fb.putPixel(row,col,"═",bgColor,contourColor);
                }

                fb.putPixel(row,this.posx+this.width-1,"╗",bgColor,contourColor);

                // centered title
                const titleLen=(" "+this.windowTitle+" ").length;
                const titleXpos=(this.width-titleLen)>>1;
                fb.printString(this.posx+titleXpos,row," "+this.windowTitle+" ",bgColor,contourColor);

                // close point
                fb.printString(this.posx+3,row,"[",bgColor,contourColor);
                fb.printString(this.posx+4,row,"\u25A0",bgColor,"#00A800");
                fb.printString(this.posx+5,row,"]",bgColor,contourColor);
            }
            else if (row==(this.posy+this.height-1))
            {
                fb.putPixel(row,this.posx,"╚",bgColor,contourColor);

                for (var col=this.posx+1;col<(this.posx+this.width-1);col++)
                {
                    fb.putPixel(row,col,"═",bgColor,contourColor);
                }

                fb.putPixel(row,this.posx+this.width-1,"╝",bgColor,contourColor);
                fb.shadowize(row,this.posx+this.width);
            }
            else
            {
                fb.putPixel(row,this.posx,"║",bgColor,contourColor);
                fb.putPixel(row,this.posx+this.width-1,"║",bgColor,contourColor);
                fb.shadowize(row,this.posx+this.width);
            }
        }

        // bottom shadow
        for (var x=this.posx+1;x<this.posx+this.width+1;x++)
        {
            fb.shadowize(this.posy+this.height,x);
        }

        // text
        var line=this.posy+2;
        for (var row=0;row<this.windowText.length;row++)
        {
            fb.printString(this.posx+3,row+line,this.windowText[row],bgColor,"black");
        }

        // ok button?
        if (this.hasOkButton)
        {
            this.okButton.draw(fb);
        }
        
    }
}
