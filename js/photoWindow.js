/* photowindow */

class cPhotoWindow extends cWindow
{
    constructor(px,py,title,dimx,dimy,bgColor,imgName,parentGui)
    {
        super(px,py,title,dimx,dimy,bgColor,parentGui);

        this.imgReady=false;
        var thisObject=this;

        this.photoGrid=[];
        this.photoWidth=dimx-2;
        this.photoHeight=dimy-2;

        aalib.read.image.fromURL(imgName)
        .map(aalib.aa({ width: this.photoWidth, height: this.photoHeight, colored: true }))
            .map(aalib.filter.inverse())
            .map(aalib.render.html({ background: "#000", fontFamily: "Ubuntu Mono, monospace" }))
            .do(function (el) {
                el.childNodes.forEach(element => 
                {
                    if (element.outerHTML)
                    {
                        if (element.outerHTML.includes("span"))
                        {
                            var elText=element.childNodes[0].data;
                            if ((elText.length!=1)||(elText==" ")) elText="█";
                            var rgbExpr=element.outerHTML.substring(element.outerHTML.indexOf("rgb(")+4,element.outerHTML.indexOf(")"));
                            //console.log(elText+" "+rgbExpr);
                            thisObject.photoGrid.push([elText,rgbExpr]);
                        }
                    }
                });

                thisObject.imgReady=true;
            })
        .subscribe();
    }

    handleMessage(msgType,msgPayload)
    {
        super.handleMessage(msgType,msgPayload);
    }

    update()
    {
        super.update();
    }

    draw(fb)
    {
        super.draw(fb);

        if (this.displayPhase==0) return;

        if (!this.imgReady) return;

        var idx=0;
        for (var row=0;row<this.photoHeight;row++)
        {
            for (var col=0;col<this.photoWidth;col++)
            {
                fb.putPixel(this.posy+row+1,this.posx+col+1,this.photoGrid[idx][0],"black","rgb("+this.photoGrid[idx][1]+")");
                idx++;
            }
        }
    }
}
