/* alertbox */

class cAlertBox extends cWindow
{
    constructor(okButton,okButtonText,cancelButton,cancelButtonText,title,text,dimx,dimy,px,py,parentGui)
    {
        var bgColor="#c0c0c0";
        super(px,py,title,dimx,dimy,bgColor,parentGui);

        this.windowText=text;
        this.hasOkButton=okButton;
        this.okButtonText=okButtonText;
        this.hasCancelButton=cancelButton;
        this.cancelButtonText=cancelButtonText;

        if (this.hasOkButton)
        {
            const txtLen=this.okButtonText.length;
            const horzPos=((dimx-txtLen)>>1);
            const vertPos=this.windowText.length+3;
            this.okButton=new cButton(horzPos,vertPos,this.okButtonText,"#b0b0b0","#00A800","white",this.posx,this.posy,this.onOkButt,this);
        }
    }

    onOkButt(parent)
    {
        parent.deletionFlag=true;
    }

    handleMessage(msgType,msgPayload)
    {
        super.handleMessage(msgType,msgPayload);

        this.okButton.handleMessage(msgType,msgPayload);
    }

    update()
    {
        super.update();
        this.okButton.updateParentPos(this.posx,this.posy);
    }

    draw(fb)
    {
        super.draw(fb);
        if (this.displayPhase==0) return;

        // text
        var line=this.posy+2;
        for (var row=0;row<this.windowText.length;row++)
        {
            fb.printString(this.posx+3,row+line,this.windowText[row],this.bgColor,"black");
        }

        // ok button?
        if (this.hasOkButton)
        {
            this.okButton.draw(fb);
        }
    }
}
