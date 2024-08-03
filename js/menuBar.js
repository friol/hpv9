/* upper mac-style dos-style menu bar */

class cMenuBar
{
    constructor()
    {
        this.separatorName="*separator*";

        this.menuOptions=[
            {
                "name":"File",
                "highlighted": false,
                "open":false,
                "menuxsize":30,
                "menuysize":8,
                "options":
                [
                    {"name":"Open","shortcut":"F1","highlighted":false},
                    {"name":"Save","shortcut":null,"highlighted":false},
                    {"name":"Save As","shortcut":null,"highlighted":false},
                    {"name":this.separatorName,"shortcut":null,"highlighted":false},
                    {"name":"Preferences","shortcut":null,"highlighted":false},
                    {"name":"Quit to DOS","shortcut":null,"highlighted":false}
                ]
            },
            {
                "name":"Photos",
                "highlighted": false,
                "open":false,
                "menuxsize":30,
                "menuysize":7,
                "options":
                [
                    {"name":"Dolomites","shortcut":null,"highlighted":false},
                    {"name":"Portugal","shortcut":null,"highlighted":false},
                    {"name":"USA","shortcut":null,"highlighted":false},
                    {"name":"Rome","shortcut":null,"highlighted":false},
                    {"name":"Italy","shortcut":null,"highlighted":false}
                ]
            },
            {
                "name":"Games",
                "highlighted": false,
                "open":false,
                "menuxsize":30,
                "menuysize":6,
                "options":
                [
                    {"name":"Snake","shortcut":null,"highlighted":false},
                    {"name":"Gioco del 15","shortcut":null,"highlighted":false},
                    {"name":"Solitario","shortcut":null,"highlighted":false},
                    {"name":"Global Thermonuclear War","shortcut":null,"highlighted":false},
                ]
            }
        ];
    }

    handleMessage(msgType,msgPayload)
    {
        if (msgType==messageTypesEnum.MSG_MOUSECLICK)
        {
            const mousex=msgPayload[0];
            const mousey=msgPayload[1];

            if (mousey==0) // click on menubar
            {
                // see if we have to pull down a menu
                var poz=4;
                for (var m=0;m<this.menuOptions.length;m++)
                {
                    var x0=poz;
                    var x1=x0+this.menuOptions[m].name.length;

                    if ((mousex>=x0)&&(mousex<x1)) 
                    {
                        this.menuOptions[m].open=true;
                    }
                    else this.menuOptions[m].open=false;
                    poz+=2;
                    poz+=this.menuOptions[m].name.length;
                }
            }
            else if (mousey>11)
            {
                for (var m=0;m<this.menuOptions.length;m++)
                {
                    this.menuOptions[m].open=false;
                }
            }
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

                // menu highlighting
                var poz=4;
                for (var m=0;m<this.menuOptions.length;m++)
                {
                    for (var mi=0;mi<this.menuOptions[m].options.length;mi++)
                    {
                        this.menuOptions[m].options[mi].highlighted=false;                        
                    }

                    if (this.menuOptions[m].open==true)                    
                    {
                        if ((mousex>=poz)&&(mousex<(poz+this.menuOptions[m].menuxsize)))
                        {
                            if ((mousey>1)&&(mousey<this.menuOptions[m].options.length+2))
                            {
                                const highOption=mousey-2;
                                this.menuOptions[m].options[highOption].highlighted=true;
                            }
                        }
                    }

                    poz+=2;
                    poz+=this.menuOptions[m].name.length;
                }
            }

        }
    }

    drawMenu(fb,mnum)
    {
        const xsz=this.menuOptions[mnum].menuxsize;
        const ysz=this.menuOptions[mnum].menuysize;

        var poz=4;
        for (var m=0;m<mnum;m++)
        {
            poz+=2;
            poz+=this.menuOptions[m].name.length;
        }

        for (var row=1;row<(ysz+1);row++)
        {
            // solid background
            for (var col=poz-2;col<(poz+xsz);col++)            
            {
                fb.framebuffer[row][col].character="\u2588";
                fb.framebuffer[row][col].bgColor="lightgray";
                fb.framebuffer[row][col].fgColor="lightgray";
            }

            // right shadow
            if (row!=1) fb.shadowize(row,poz+xsz);

            // contour line
            if (row==1)
            {
                fb.framebuffer[row][poz-1].character="┌";
                fb.framebuffer[row][poz-1].bgColor="lightgray";
                fb.framebuffer[row][poz-1].fgColor="black";

                for (var col=poz;col<(poz+xsz-2);col++)            
                {
                    fb.framebuffer[row][col].character="─";
                    fb.framebuffer[row][col].bgColor="lightgray";
                    fb.framebuffer[row][col].fgColor="black";
                }
        
                fb.framebuffer[row][poz+xsz-2].character="┐";
                fb.framebuffer[row][poz+xsz-2].bgColor="lightgray";
                fb.framebuffer[row][poz+xsz-2].fgColor="black";
            }
            else if (row==ysz)
            {
                fb.framebuffer[row][poz-1].character="└";
                fb.framebuffer[row][poz-1].bgColor="lightgray";
                fb.framebuffer[row][poz-1].fgColor="black";

                for (var col=poz;col<(poz+xsz-2);col++)            
                {
                    fb.framebuffer[row][col].character="─";
                    fb.framebuffer[row][col].bgColor="lightgray";
                    fb.framebuffer[row][col].fgColor="black";
                }
        
                fb.framebuffer[row][poz+xsz-2].character="┘";
                fb.framebuffer[row][poz+xsz-2].bgColor="lightgray";
                fb.framebuffer[row][poz+xsz-2].fgColor="black";
            }
            else
            {
                fb.framebuffer[row][poz-1].character="│";
                fb.framebuffer[row][poz-1].bgColor="lightgray";
                fb.framebuffer[row][poz-1].fgColor="black";

                fb.framebuffer[row][poz+xsz-2].character="│";
                fb.framebuffer[row][poz+xsz-2].bgColor="lightgray";
                fb.framebuffer[row][poz+xsz-2].fgColor="black";
            }

            // menu items
            var currow=2;
            for (var mi=0;mi<this.menuOptions[mnum].options.length;mi++)
            {
                const menuvoice=this.menuOptions[mnum].options[mi].name;

                if (menuvoice==this.separatorName)
                {
                    fb.framebuffer[currow][poz-1].character="├";
                    fb.framebuffer[currow][poz-1].bgColor="lightgray";
                    fb.framebuffer[currow][poz-1].fgColor="black";

                    fb.drawHorizontalLine(currow,poz,poz+xsz-1,"─","lightgray","black");

                    fb.framebuffer[currow][poz+xsz-2].character="┤";
                    fb.framebuffer[currow][poz+xsz-2].bgColor="lightgray";
                    fb.framebuffer[currow][poz+xsz-2].fgColor="black";
                }
                else
                {
                    var bgColll="lightgray";
                    if (this.menuOptions[mnum].options[mi].highlighted)
                    {
                        fb.drawHorizontalLine(currow,poz,poz+xsz-2,"x","#00A800","#00A800");
                        bgColll="#00A800";
                    }
                    // first letter
                    const firstLetter=menuvoice[0];
                    fb.printString(poz,currow,firstLetter,bgColll,"#A80000");

                    // rest of the string
                    fb.printString(poz+1,currow,menuvoice.substring(1),bgColll,"black");
                }

                currow+=1;
            }
        }

        // bottom shadow
        for (var col=poz-1;col<(poz+xsz+1);col++)
        {
            fb.shadowize(ysz+1,col);
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

            if (this.menuOptions[m].open)
            {
                this.drawMenu(fb,m);
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
