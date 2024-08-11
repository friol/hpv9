/* the gui */

class cGui
{
    constructor()
    {
        this.listOfComponents=new Array();
        this.mousexSquare=0;
        this.mouseySquare=0;
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

    draw(fb)
    {
        this.listOfComponents.forEach(element => 
        {
            element.draw(fb);    
        });

        // draw mouse
        fb.framebuffer[this.mouseySquare][this.mousexSquare].character="\u2588";
        fb.framebuffer[this.mouseySquare][this.mousexSquare].bgColor="lightgray";
        fb.framebuffer[this.mouseySquare][this.mousexSquare].fgColor="yellow";
    }
}
