/* upper mac-style dos-style menu bar */

class cMenuBar
{
    constructor()
    {
        this.menuOptions=[
            {
                "name":"File",
                "highlighted": false,
                "options":
                [
                    "Open",
                    "Save",
                    "Save as",
                    "Preferences"
                ]
            },
            {
                "name":"Photos",
                "highlighted": false,
                "options":
                [
                    "Dolomites",
                    "Portugal",
                    "USA",
                    "Rome",
                    "Italy"
                ]
            },
            {
                "name":"Games",
                "highlighted": false,
                "options":
                [
                    "Snake",
                    "Gioco del Quindici",
                    "Solitario",
                    "Global Thermonuclear War"
                ]
            }

        ];

    }

    handleMessage(msgType,msgPayload)
    {
        if (msgType==messageTypesEnum.MSG_MOUSECLICK)
        {
            // see if we have to pull down a menu

        }
        else if (msgType==messageTypesEnum.MSG_MOUSEMOVE)
        {
            // menu name/menu voice highlighting on mouseover
            const mousex=msgPayload[0];
            const mousey=msgPayload[1];

            if (mousey==0)
            {
                var poz=4;
                for (var m=0;m<this.menuOptions.length;m++)
                {
                    var x0=poz;
                    var x1=x0+this.menuOptions[m].name.length;

                    if ((mousex>=x0)&&(mousex<x1)) this.menuOptions[m].highlighted=true;
                    else this.menuOptions[m].highlighted=false;
                    poz+=2;
                    poz+=this.menuOptions[m].name.length;
                }
            
            }
            else
            {
                for (var m=0;m<this.menuOptions.length;m++)
                {
                    this.menuOptions[m].highlighted=false;
                }    
            }

        }
    }

    draw(fb)
    {
        // upper menu
        fb.drawHorizontalLine(0,0,fb.numCols,"\u2588","lightgray","lightgray");

        // hamburger
        fb.framebuffer[0][1].character="=";//"\u2CB7";
        fb.framebuffer[0][1].bgColor="lightgray";
        fb.framebuffer[0][1].fgColor="#A80000";

        // draw menu names
        var poz=4;
        for (var m=0;m<this.menuOptions.length;m++)
        {
            var bgcol="lightgray";
            if (this.menuOptions[m].highlighted) bgcol="#00A800";

            // first letter
            const firstLetter=this.menuOptions[m].name[0];
            fb.printString(poz,0,firstLetter,bgcol,"#A80000");

            // rest of the string
            fb.printString(poz+1,0,this.menuOptions[m].name.substring(1),bgcol,"black");
            
            // background 2 chars
            if (this.menuOptions[m].highlighted)
            {
                fb.printString(poz-1,0,"\u2588","#00A800","#00A800");               
                fb.printString(poz+this.menuOptions[m].name.length,0,"\u2588","#00A800","#00A800");               
            }
            
            poz+=2;
            poz+=this.menuOptions[m].name.length;
        }
    
        // watch on the right
        const d = new Date();
        
        let hour = d.getHours();
        let minute=d.getMinutes();
        let second=d.getSeconds();

        const tod=hour.toString().padStart(2,"0")+":"+minute.toString().padStart(2,"0")+":"+second.toString().padStart(2,"0");
        fb.printString(fb.numCols-9,0,tod,"lightgray","black");

    }
}
