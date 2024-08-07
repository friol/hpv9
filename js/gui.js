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
        this.listOfComponents.push(c);
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
