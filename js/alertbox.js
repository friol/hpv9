/* alertbox */

class cAlertBox extends cWindow
{
    constructor(okButton,okButtonText,cancelButton,cancelButtonText,title,text,dimx,dimy,px,py,parentGui,onOk)
    {
        var bgColor="#c0c0c0";
        super(px,py,title,dimx,dimy,bgColor,parentGui);

        this.windowText=text;
        this.hasOkButton=okButton;
        this.okButtonText=okButtonText;
        this.onOkk=onOk;
        this.hasCancelButton=cancelButton;
        this.cancelButtonText=cancelButtonText;

        if (this.hasOkButton)
        {
            const txtLen=this.okButtonText.length;
            var horzPos=((dimx-txtLen)>>1);
            if (this.hasCancelButton) horzPos-=5;
            const vertPos=this.windowText.length+3;
            this.okButton=new cButton(horzPos,vertPos,this.okButtonText,"#b0b0b0","#00A800","white",this.posx,this.posy,this.onOkButt,this);
        }

        if (this.hasCancelButton)
        {
            const txtLen=this.cancelButtonText.length;
            var horzPos=((dimx-txtLen)>>1);
            if (this.hasOkButton) horzPos+=5;
            const vertPos=this.windowText.length+3;
            this.cancelButton=new cButton(horzPos,vertPos,this.cancelButtonText,"#b0b0b0","#00A800","white",this.posx,this.posy,this.onCancelButt,this);
        }
    }

    onOkButt(parent)
    {
        parent.onOkk(parent.parentGui);
        //parent.deletionFlag=true;
    }

    onCancelButt(parent)
    {
        parent.deletionFlag=true;
    }

    handleMessage(msgType,msgPayload)
    {
        super.handleMessage(msgType,msgPayload);

        if (this.hasOkButton) this.okButton.handleMessage(msgType,msgPayload);
        if (this.hasCancelButton) this.cancelButton.handleMessage(msgType,msgPayload);
    }

    update()
    {
        super.update();
        if (this.hasOkButton) this.okButton.updateParentPos(this.posx,this.posy);
        if (this.hasCancelButton) this.cancelButton.updateParentPos(this.posx,this.posy);
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

        if (this.hasOkButton) this.okButton.draw(fb);
        if (this.hasCancelButton) this.cancelButton.draw(fb);
    }
}
