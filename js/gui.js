/* the gui */

class cGui
{
    constructor(fb,isMobile)
    {
        this.listOfComponents=new Array();
        this.mousexSquare=0;
        this.mouseySquare=0;
        this.fbPtr=fb;
        this.isMobile=isMobile;

        this.initialSetup(false,fb);
    }

    initialSetup(reinit,fb)
    {
        var loaderWidth=50; var loaderHeight=10;
        if (this.isMobile)
        {
            loaderWidth=this.fbPtr.numCols-4;
        }

        var wintitle="Loading";
        if (this.isMobile) wintitle+="Mob";
        const loaderX=(fb.numCols-loaderWidth)>>1;
        const loaderY=(fb.numRows-loaderHeight)>>1;
        var loaderWindow=new cLoader(loaderX,loaderY,wintitle,loaderWidth,loaderHeight,"#c02020",this);
        this.addComponent(loaderWindow);

        var glbDesktop=new cDesktop();
        var glbMenuBar=new cMenuBar(this,this.isMobile);
        var glbStatusBar=new cStatusBar(this);

        if (reinit)
        {
            glbDesktop.drawState=1;
            glbMenuBar.drawState=1;
            glbStatusBar.drawState=1;
        }

        this.addComponent(glbDesktop);
        this.addComponent(glbMenuBar);
        this.addComponent(glbStatusBar);        
    }

    activate()
    {
        // turn on the destktop
        for (var cmp=0;cmp<this.listOfComponents.length;cmp++)
        {
            if ((this.listOfComponents[cmp].priority==-10000)||(this.listOfComponents[cmp].priority==10000))
            {
                this.listOfComponents[cmp].drawState=1;
                //this.listOfComponents[cmp].drawState=2;
            }
        }    
    }

    quitToDOS()
    {
        this.listOfComponents=[];
        var ds=new cDOSShell(this);
        this.listOfComponents.push(ds);
    }

    setFPS(fps)
    {
        for (var c=0;c<this.listOfComponents.length;c++)
        {
            if (this.listOfComponents[c].windowTitle=="TheStatusBar")
            {
                this.listOfComponents[c].setFPS(fps);
            }
        }
    }

    isFrontmost(pri)
    {
        var maxPri=-10000;
        for (var cmp=0;cmp<this.listOfComponents.length;cmp++)
        {
            if ((this.listOfComponents[cmp].priority>maxPri)&&(this.listOfComponents[cmp].priority!=10000))
            {
                maxPri=this.listOfComponents[cmp].priority;
            }
        }

        if (pri==maxPri) return true;
        return false;
    }

    addComponent(c)
    {
        if (c.priority==-1)
        {
            // new component; assign it the frontmost priority below 10.000
            var frontmost=0;
            for (var cmp=0;cmp<this.listOfComponents.length;cmp++)
            {
                if ((this.listOfComponents[cmp].priority>frontmost)&&(this.listOfComponents[cmp].priority!=10000))
                {
                    frontmost=this.listOfComponents[cmp].priority;
                }
            }
            c.priority=frontmost+1;
        }

        for (var cmp=0;cmp<this.listOfComponents.length;cmp++)
        {
            if (c.priority<=this.listOfComponents[cmp].priority)
            {
                this.listOfComponents.splice(cmp, 0, c);
                return;
            }
        }
        
        this.listOfComponents.push(c);
    }

    makeFrontmost(pri)
    {
        // find frontmost
        var idxFrontmost=0;
        var maxPri=-10000;

        for (var cmp=0;cmp<this.listOfComponents.length;cmp++)
        {
            if (this.listOfComponents[cmp].priority>maxPri)
            {
                if (this.listOfComponents[cmp].priority!=10000)
                {
                    maxPri=this.listOfComponents[cmp].priority;
                    idxFrontmost=cmp;
                }
            }
        }

        // find our index
        var idxCurwin=0;
        for (var cmp=0;cmp<this.listOfComponents.length;cmp++)
        {
            if (this.listOfComponents[cmp].priority==pri)
            {
                idxCurwin=cmp;
                break;
            }
        }

        if (idxCurwin==idxFrontmost) return; // it's already the frontmost

        // make frontmost
        var w1=this.listOfComponents[idxCurwin];
        w1.priority=maxPri;

        this.listOfComponents.splice(idxCurwin,1);
        this.listOfComponents.splice(idxFrontmost,0,w1);

        for (var cmp=0;cmp<this.listOfComponents.length;cmp++)
        {
            if ((cmp!=idxFrontmost)&&(this.listOfComponents[cmp].priority!=10000)&&(this.listOfComponents[cmp].priority>0))
            {
                this.listOfComponents[cmp].priority-=1;
            }
        }    
    }

    storeMousePos(mx,my,fb)
    {
        const newMousex=Math.floor(mx/fb.fontxsize);        
        const newMousey=Math.floor(my/fb.fontysize);        

        if ((newMousex>=0)&&(newMousex<fb.numCols)) this.mousexSquare=newMousex;
        if ((newMousey>=0)&&(newMousey<fb.numRows)) this.mouseySquare=newMousey;
    }

    handleMessage(msgType,msgPayload)
    {
        this.listOfComponents.forEach(element => 
        {
            element.handleMessage(msgType,msgPayload);    
        });
    }

    update()
    {
        for (var w=0;w<this.listOfComponents.length;w++)
        {
            if (this.listOfComponents[w].deletionFlag)
            {
                this.listOfComponents.splice(w,1);
            }
            else
            {
                this.listOfComponents[w].update();
            }
        }
    }

    invert(col)
    {
        col=col.substring(1);
        var r=parseInt(col.substring(0,2),16);
        var g=parseInt(col.substring(2,4),16);
        var b=parseInt(col.substring(4,6),16);

        var ir=255-r; var ig=255-g; var ib=255-b;

        return "#"+ir.toString(16).padStart(2,0)+ig.toString(16).padStart(2,0)+ib.toString(16).padStart(2,0);
    }

    drawMouseCursor(fb)
    {
        const fgcol=fb.framebuffer[this.mouseySquare][this.mousexSquare].fgColor;
        const bgcol=fb.framebuffer[this.mouseySquare][this.mousexSquare].bgColor;

        var ctx = document.createElement('canvas').getContext('2d');
        ctx.fillStyle = fgcol;
        const hexFgCol=ctx.fillStyle;

        ctx.fillStyle = bgcol;
        const hexBgCol=ctx.fillStyle;
        
        fb.framebuffer[this.mouseySquare][this.mousexSquare].fgColor=this.invert(hexFgCol);
        fb.framebuffer[this.mouseySquare][this.mousexSquare].bgColor=this.invert(hexBgCol);
        //fb.framebuffer[this.mouseySquare][this.mousexSquare].character="x";
    }

    draw(fb)
    {
        this.listOfComponents.forEach(element => 
        {
            element.draw(fb);    
        });

        // draw mouse
        this.drawMouseCursor(fb);
    }
}
