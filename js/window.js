/* window class */

class cWindow
{
    constructor(px,py,title,dimx,dimy,bgColor,parentGui)
    {
        this.parentGui=parentGui;
        this.targetPosx=px; this.targetPosy=py;
        this.windowTitle=title;

        this.targetWidth=dimx; this.targetHeight=dimy;
        this.bgColor=bgColor;

        this.dragging=false;

        this.displayPhase=0; // 0 opening, 1 normal, 2 closing
        this.posx=this.targetPosx+Math.floor((this.targetWidth-this.windowTitle.length)/2);
        this.posy=this.targetPosy+Math.floor((this.targetHeight-2)/2);

        this.width=this.windowTitle.length+8;
        this.height=2;

        this.priority=-1;
    }

    update()
    {
        if (this.displayPhase>0) return; 

        var creating=false;
        if (this.posx>this.targetPosx) { this.posx--; creating=true; }
        if (this.posy>this.targetPosy) { this.posy--; creating=true; }
        if (this.width<this.targetWidth) { this.width+=2; creating=true; }
        if (this.height<this.targetHeight) { this.height+=2; creating=true; }

        if (!creating)
        {
            this.displayPhase=1;
            this.posx=this.targetPosx;
            this.posy=this.targetPosy;
            this.height=this.targetHeight;
            this.width=this.targetWidth;
        }
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
                        this.deletionFlag=true;
                    }
                    else
                    {
                        this.dragging=true;
                        this.dragPointx=mousex;
                        this.dragPointy=mousey;

                        // window must became the frontmost
                        this.parentGui.makeFrontmost(this.priority);
                    }
                }
            }
            else
            {
                // click on rest of window?

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

                this.dragPointx=mousex;
                this.dragPointy=mousey;
            }
        }
    }

    draw(fb)
    {
        var contourColor="white";
        if (this.dragging) contourColor="#00A800";

        // solid background
        for (var row=this.posy;row<(this.posy+this.height);row++)
        {
            fb.drawHorizontalLine(row,this.posx,this.posx+this.width,"█",this.bgColor,this.bgColor);
        }

        // contour
        for (var row=this.posy;row<(this.posy+this.height);row++)
        {
            if (row==this.posy)
            {
                fb.putPixel(row,this.posx,"╔",this.bgColor,contourColor);

                for (var col=this.posx+1;col<(this.posx+this.width-1);col++)
                {
                    fb.putPixel(row,col,"═",this.bgColor,contourColor);
                }

                fb.putPixel(row,this.posx+this.width-1,"╗",this.bgColor,contourColor);

                // centered title
                const titleLen=(" "+this.windowTitle+" ").length;
                const titleXpos=(this.width-titleLen)>>1;
                fb.printString(this.posx+titleXpos,row," "+this.windowTitle+" ",this.bgColor,contourColor);

                // close point
                fb.printString(this.posx+3,row,"[",this.bgColor,contourColor);
                fb.printString(this.posx+4,row,"\u25A0",this.bgColor,"#00A800");
                fb.printString(this.posx+5,row,"]",this.bgColor,contourColor);
            }
            else if (row==(this.posy+this.height-1))
            {
                fb.putPixel(row,this.posx,"╚",this.bgColor,contourColor);

                for (var col=this.posx+1;col<(this.posx+this.width-1);col++)
                {
                    fb.putPixel(row,col,"═",this.bgColor,contourColor);
                }

                fb.putPixel(row,this.posx+this.width-1,"╝",this.bgColor,contourColor);
                fb.shadowize(row,this.posx+this.width);
            }
            else
            {
                fb.putPixel(row,this.posx,"║",this.bgColor,contourColor);
                fb.putPixel(row,this.posx+this.width-1,"║",this.bgColor,contourColor);
                fb.shadowize(row,this.posx+this.width);
            }
        }

        // bottom shadow
        for (var x=this.posx+1;x<this.posx+this.width+1;x++)
        {
            fb.shadowize(this.posy+this.height,x);
        }
    }
}
