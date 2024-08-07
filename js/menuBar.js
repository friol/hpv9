/* upper mac-style dos-style menu bar */

class cMenuBar
{
    constructor(theGui)
    {
        this.guiPtr=theGui;
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
                "name":"Archive",
                "highlighted": false,
                "open":false,
                "menuxsize":30,
                "menuysize":12,
                "options":
                [
                    {"name":"dantonag.it v1","shortcut":null,"highlighted":false,"onClickFun":this.openDantonagitV1},
                    {"name":"dantonag.it v2","shortcut":null,"highlighted":false,"onClickFun":this.openDantonagitV2},
                    {"name":"dantonag.it v3","shortcut":null,"highlighted":false,"onClickFun":this.openDantonagitV3},
                    {"name":"dantonag.it v4","shortcut":null,"highlighted":false,"onClickFun":this.openDantonagitV4},
                    {"name":"dantonag.it v5","shortcut":null,"highlighted":false,"onClickFun":this.openDantonagitV5},
                    {"name":"dantonag.it v6","shortcut":null,"highlighted":false,"onClickFun":this.openDantonagitV6},
                    {"name":"dantonag.it v7","shortcut":null,"highlighted":false,"onClickFun":this.openDantonagitV7},
                    {"name":"dantonag.it v8","shortcut":null,"highlighted":false,"onClickFun":this.openDantonagitV8},
                    {"name":"datunnel","shortcut":null,"highlighted":false,"onClickFun":this.openDatunnel},
                    {"name":"GitHub","shortcut":null,"highlighted":false,"onClickFun":this.openGithub},
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
                    {"name":"Snake","shortcut":null,"highlighted":false,"onClickFun":this.openSnake},
                    {"name":"Gioco del 15","shortcut":null,"highlighted":false},
                    {"name":"Solitario","shortcut":null,"highlighted":false},
                    {"name":"Global Thermonuclear War","shortcut":null,"highlighted":false},
                ]
            },
            {
                "name":"About",
                "highlighted":false,
                "open":false,
                "menuxsize":30,
                "menuysize":3,
                "options":
                [
                    {"name":"About this website","shortcut":null,"highlighted":false,"onClickFun":this.aboutFunction},
                ]

            }
        ];
    }

    openDantonagitV1(callerObj)
    {
        window.open("https://www.dantonag.it/index_en.html", '_blank').focus();
    }

    openDantonagitV2(callerObj)
    {
        window.open("https://www.dantonag.it/v2/index2.html", '_blank').focus();
    }

    openDantonagitV3(callerObj)
    {
        window.open("https://www.dantonag.it/hpv3/index.html", '_blank').focus();
    }

    openDantonagitV4(callerObj)
    {
        window.open("https://www.dantonag.it/hpv4/home.html", '_blank').focus();
    }

    openDantonagitV5(callerObj)
    {
        window.open("http://www.dantonag.it/hpv5/main.html", '_blank').focus();
    }

    openDantonagitV6(callerObj)
    {
        window.open("https://www.dantonag.it/hpv6/main.html#", '_blank').focus();
    }

    openDantonagitV7(callerObj)
    {
        window.open("https://www.dantonag.it/hpv7/index.html?site=0", '_blank').focus();
    }

    openDantonagitV8(callerObj)
    {
        window.open("https://www.dantonag.it/hpv8/main.html", '_blank').focus();
    }

    openDatunnel(callerObj)
    {
        window.open("https://datunnel.blogspot.com/", '_blank').focus();
    }

    openGithub(callerObj)
    {
        window.open("https://github.com/friol", '_blank').focus();
    }

    aboutFunction(callerObj)
    {
        // opens about message box
        var dialogBox=new cAlertBox(true,"OK!",false,"","About dantonag.it",
            ["dantonag.it v9, created by friol","(c) friol 2024","all rights reserved"],70,9,
            10,10);
        callerObj.guiPtr.addComponent(dialogBox);
    }

    openSnake(callerObj)
    {
        var snakeWindow=new cSnakeWindow(10,10,"Snake-y",50,20,"#2020c0");
        callerObj.guiPtr.addComponent(snakeWindow);
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
                        if (this.menuOptions[m].open)
                        {
                            // if it's open, close it
                            this.menuOptions[m].open=false;
                        }
                        else
                        {
                            this.menuOptions[m].open=true;
                        }
                    }
                    else this.menuOptions[m].open=false;
                    poz+=2;
                    poz+=this.menuOptions[m].name.length;
                }
            }
            else 
            {
                // click outside the menu?
                var poz=4;
                for (var m=0;m<this.menuOptions.length;m++)
                {
                    if (this.menuOptions[m].open)
                    {
                        var x0=poz-2;
                        var x1=x0+this.menuOptions[m].menuxsize+2;

                        if (((mousex<x0)||(mousex>x1))||(mousey>this.menuOptions[m].menuysize))
                        {
                            this.menuOptions[m].open=false;
                        }
                    }

                    poz+=this.menuOptions[m].name.length+2;
                }

                // click on one of the options
                for (var mo=0;mo<this.menuOptions.length;mo++)
                {
                    if (this.menuOptions[mo].open)
                    {
                        for (var op=0;op<this.menuOptions[mo].options.length;op++)
                        {
                            if (this.menuOptions[mo].options[op].highlighted)
                            {
                                this.menuOptions[mo].options[op].onClickFun(this);
                                this.menuOptions[mo].open=false;
                                break;
                            }
                        }
                    }
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

    update()
    {
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
