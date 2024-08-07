/* window class */

class cWindow
{
    constructor(px,py,title,dimx,dimy,bgColor)
    {
        this.posx=px; this.posy=py;
        this.windowTitle=title;
        this.width=dimx; this.height=dimy;
        this.bgColor=bgColor;

        this.dragging=false;
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
