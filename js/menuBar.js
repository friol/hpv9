/* upper mac-style dos-style menu bar */

class cMenuBar
{
    constructor(theGui,isMobile)
    {
        this.guiPtr=theGui;
        this.separatorName="*separator*";
        this.priority=10000;
        this.windowTitle="TheMenuBar";
        this.drawState=0; // 0: all blacks
        this.initialAnimCounter=0;

        if (isMobile)
        {
            this.menuOptions=[
                {
                    "name":"File",
                    "highlighted": false,
                    "open":false,
                    "menuxsize":30,
                    "menuysize":16,
                    "options":
                    [
                        {"name":"Open","shortcut":"F1","highlighted":false,"enabled":false},
                        {"name":"Save","shortcut":null,"highlighted":false,"enabled":false},
                        {"name":this.separatorName,"shortcut":null,"highlighted":false,"enabled":true},
                        {"name":"dantonag.it v1","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/index_en.html"
                        },
                        {"name":"dantonag.it v2","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/v2/index2.html"
                        },
                        {"name":"dantonag.it v3","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/hpv3/index.html"
                        },
                        {"name":"dantonag.it v4","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/hpv4/home.html"},
                        {"name":"dantonag.it v5","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"http://www.dantonag.it/hpv5/main.html"},
                        {"name":"dantonag.it v6","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/hpv6/main.html#"},
                        {"name":"dantonag.it v7","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/hpv7/index.html?site=0"},
                        {"name":"dantonag.it v8","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/hpv8/main.html"},
                        {"name":"datunnel","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://datunnel.blogspot.com/"},
                        {"name":this.separatorName,"shortcut":null,"highlighted":false,"enabled":true},
                        {"name":"Quit to DOS","shortcut":null,"highlighted":false,"enabled":true,"onClickFun":this.quitToDOS}
                    ]
                },
                {
                    "name":"Code",
                    "highlighted": false,
                    "open":false,
                    "menuxsize":20,
                    "menuysize":5,
                    "options":
                    [
                        {"name":"github","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://github.com/friol"},
                        {"name":"shadertoy","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.shadertoy.com/user/friol"},
                        {"name":"Cloud Basic","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"http://www.dantonag.it/basicjs/basicjs.html"},
                    ]
                },
                {
                    "name":"Games",
                    "highlighted": false,
                    "open":false,
                    "menuxsize":26,
                    "menuysize":7,
                    "options":
                    [
                        {"name":"Bubble Canvas","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/bubbleCanvas/bubbleCanvas.html"
                        },
                        {"name":"Blockz","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/blockz/blockz.html"
                        },
                        {"name":"Tetris","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/tetris/tetris.html"
                        },
                        {"name":"One-bit adventure","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/onebit/main.html"
                        },
                        {"name":"Global Thermonuclear War","shortcut":null,"highlighted":false,"enabled":false},
                    ]
                },

            ];
        }
        else
        {
            this.menuOptions=[
                {
                    "name":"File",
                    "highlighted": false,
                    "open":false,
                    "menuxsize":30,
                    "menuysize":8,
                    "options":
                    [
                        {"name":"Open","shortcut":"F1","highlighted":false,"enabled":false},
                        {"name":"Save","shortcut":null,"highlighted":false,"enabled":false},
                        {"name":"Save As","shortcut":null,"highlighted":false,"enabled":false},
                        {"name":this.separatorName,"shortcut":null,"highlighted":false,"enabled":true},
                        {"name":"Preferences","shortcut":null,"highlighted":false,"enabled":true,"onClickFun":this.showPreferences},
                        {"name":"Quit to DOS","shortcut":null,"highlighted":false,"enabled":true,"onClickFun":this.quitToDOS}
                    ]
                },
                {
                    "name":"Photos",
                    "highlighted": false,
                    "open":false,
                    "menuxsize":30,
                    "menuysize":8,
                    "options":
                    [
                        {"name":"Dolomites","shortcut":null,"highlighted":false,"onClickFun":this.openPhotoWindow,"enabled":true,
                            "photoURL":"./img/photos/seceda.jpg","photoDescr":"Seceda, Dolomites, 2021","photoDimX":50,"photoDimY":35
                        },
                        {"name":"Rome","shortcut":null,"highlighted":false,"onClickFun":this.openPhotoWindow,"enabled":true,
                            "photoURL":"./img/photos/colosseum.jpg","photoDescr":"Anfiteatro Flavio, Rome, 2012","photoDimX":90,"photoDimY":35
                        },
                        {"name":"Portugal1","shortcut":null,"highlighted":false,"enabled":true,"onClickFun":this.openPhotoWindow,"enabled":true,
                            "photoURL":"./img/photos/praia.png","photoDescr":"Somewhere, Portugal, 2024","photoDimX":60,"photoDimY":42},
                        {"name":"Portugal2","shortcut":null,"highlighted":false,"enabled":true,"onClickFun":this.openPhotoWindow,"enabled":true,
                            "photoURL":"./img/photos/lisbona.png","photoDescr":"Lisboa, Portugal, 2024","photoDimX":60,"photoDimY":42},
                        {"name":"USA","shortcut":null,"highlighted":false,"enabled":true,"onClickFun":this.openPhotoWindow,"enabled":true,
                            "photoURL":"./img/photos/mac.png","photoDescr":"Some McDonald, 2019","photoDimX":50,"photoDimY":30},
                        {"name":"Italy","shortcut":null,"highlighted":false,"enabled":true,"onClickFun":this.openPhotoWindow,"enabled":true,
                            "photoURL":"./img/photos/idaley.png","photoDescr":"Le cinque terre, 2017","photoDimX":50,"photoDimY":30}
                    ]
                },
                {
                    "name":"Archive",
                    "highlighted": false,
                    "open":false,
                    "menuxsize":30,
                    "menuysize":11,
                    "options":
                    [
                        {"name":"dantonag.it v1","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/index_en.html"
                        },
                        {"name":"dantonag.it v2","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/v2/index2.html"
                        },
                        {"name":"dantonag.it v3","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/hpv3/index.html"
                        },
                        {"name":"dantonag.it v4","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/hpv4/home.html"},
                        {"name":"dantonag.it v5","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"http://www.dantonag.it/hpv5/main.html"},
                        {"name":"dantonag.it v6","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/hpv6/main.html#"},
                        {"name":"dantonag.it v7","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/hpv7/index.html?site=0"},
                        {"name":"dantonag.it v8","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/hpv8/main.html"},
                        {"name":"datunnel","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://datunnel.blogspot.com/"},
                    ]
                },
                {
                    "name":"Code",
                    "highlighted": false,
                    "open":false,
                    "menuxsize":30,
                    "menuysize":6,
                    "options":
                    [
                        {"name":"github","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://github.com/friol"},
                        {"name":"shadertoy","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.shadertoy.com/user/friol"},
                        {"name":"OPPD 2022","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://dantonag.it/oppd/index.html"},
                        {"name":"Cloud Basic","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"http://www.dantonag.it/basicjs/basicjs.html"},
                    ]
                },
                {
                    "name":"Games",
                    "highlighted": false,
                    "open":false,
                    "menuxsize":30,
                    "menuysize":8,
                    "options":
                    [
                        {"name":"Snake","shortcut":null,"highlighted":false,"onClickFun":this.openSnake,"enabled":true},
                        {"name":"Bubble Canvas","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/bubbleCanvas/bubbleCanvas.html"
                        },
                        {"name":"Blockz","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/blockz/blockz.html"
                        },
                        {"name":"One-bit adventure","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/onebit/main.html"
                        },
                        {"name":"Tetris","shortcut":null,"highlighted":false,"onClickFun":this.openURL,"enabled":true,
                            "siteURL":"https://www.dantonag.it/tetris/tetris.html"
                        },
                        {"name":"Global Thermonuclear War","shortcut":null,"highlighted":false,"enabled":false},
                    ]
                },
                {
                    "name":"About",
                    "highlighted":false,
                    "open":false,
                    "menuxsize":30,
                    "menuysize":5,
                    "options":
                    [
                        {"name":"Task Manager","shortcut":null,"highlighted":false,"onClickFun":this.debugWindow,"enabled":true},
                        {"name":"Help","shortcut":null,"highlighted":false,"onClickFun":this.showHelp,"enabled":true},
                        {"name":"About this website","shortcut":null,"highlighted":false,"onClickFun":this.aboutFunction,"enabled":true},
                    ]

                }
            ];
        }
    }

    openURL(callerObj)
    {
        window.open(this.siteURL, '_blank').focus();
    }

    showPreferences(callerObj)
    {
        function closeMe(callerObj)
        {
            this.deletionFlag=true;
        }

        const title="Preferences";
        const px=(callerObj.guiPtr.fbPtr.numCols-50)>>1;
        const py=(callerObj.guiPtr.fbPtr.numRows-7)>>1;

        var dialogBox=new cAlertBox(true,"Nobody!",false,"",title,
            ["Who needs preferences anyway..."],50,7,
            px,py,callerObj.guiPtr,closeMe);
        callerObj.guiPtr.addComponent(dialogBox);
    }

    aboutFunction(callerObj)
    {
        function closeMe(callerObj)
        {
            this.deletionFlag=true;
        }

        // opens about message box

        const title="About dantonag.it";
        const px=(callerObj.guiPtr.fbPtr.numCols-70)>>1;
        const py=(callerObj.guiPtr.fbPtr.numRows-9)>>1;

        var dialogBox=new cAlertBox(true,"OK!",false,"",title,
            ["dantonag.it v9, created by friol","(c) friol 2024","using aalib.js and hammer.js"],70,9,
            px,py,callerObj.guiPtr,closeMe);
        callerObj.guiPtr.addComponent(dialogBox);
    }

    openSnake(callerObj)
    {
        var snakeWindow=new cSnakeWindow(5,9,"Snake-y",50,30,"#2020c0",callerObj.guiPtr);
        callerObj.guiPtr.addComponent(snakeWindow);
    }

    /*initialLoader(callerObj)
    {
        var loaderWindow=new cLoader(20,30,"Loading",50,10,"#c02020",callerObj.guiPtr);
        callerObj.guiPtr.addComponent(loaderWindow);
    }*/

    openPhotoWindow(callerObj)
    {
        var photowindow=new cPhotoWindow(5,5,"Photo viewer",this.photoDimX,this.photoDimY,"black",this.photoURL,callerObj.guiPtr);
        callerObj.guiPtr.addComponent(photowindow);
    }

    debugWindow(callerObj)
    {
        var debuggWindow=new cDebugWin(10,10,"Task Manager",50,10,"#c0c0c0",callerObj.guiPtr);
        callerObj.guiPtr.addComponent(debuggWindow);
    }

    reallyQuit(callerObj)
    {
        //console.log("Quitting"+callerObj);
        callerObj.quitToDOS();
    }

    quitToDOS(callerObj)
    {
        const px=(callerObj.guiPtr.fbPtr.numCols-40)>>1;
        const py=(callerObj.guiPtr.fbPtr.numRows-7)>>1;

        var dialogBox=new cAlertBox(true,"Yes!",true,"Not really","Quit to DOS",["Are you sure?"],40,7,px,py,callerObj.guiPtr,callerObj.reallyQuit);
        callerObj.guiPtr.addComponent(dialogBox);
    }

    showHelp(callerObj)
    {
        const px=(callerObj.guiPtr.fbPtr.numCols-50)>>1;
        const py=(callerObj.guiPtr.fbPtr.numRows-26)>>1;

        var helpWin=new cHelpWindow(px,py,"Help",50,26,"#2020c0",callerObj.guiPtr);
        callerObj.guiPtr.addComponent(helpWin);
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
                                if (this.menuOptions[mo].options[op].enabled)
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
        else if (msgType==messageTypesEnum.MSG_KEYDOWN)
        {
            const k=msgPayload[0];
            if (k=="F1")
            {
                var helpWin=new cHelpWindow(5,9,"Help",50,26,"#2020c0",this.guiPtr);
                this.guiPtr.addComponent(helpWin);
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
                fb.putPixel(row,col,"\u2588","lightgray","lightgray");
            }

            // right shadow
            if (row!=1) fb.shadowize(row,poz+xsz);

            // contour line
            if (row==1)
            {
                fb.putPixel(row,poz-1,"┌","lightgray","black");

                for (var col=poz;col<(poz+xsz-2);col++)            
                {
                    fb.putPixel(row,col,"─","lightgray","black");
                }
        
                fb.putPixel(row,poz+xsz-2,"┐","lightgray","black");
            }
            else if (row==ysz)
            {
                fb.putPixel(row,poz-1,"└","lightgray","black");

                for (var col=poz;col<(poz+xsz-2);col++)            
                {
                    fb.putPixel(row,col,"─","lightgray","black");
                }
        
                fb.putPixel(row,poz+xsz-2,"┘","lightgray","black");
            }
            else
            {
                fb.putPixel(row,poz-1,"│","lightgray","black");
                fb.putPixel(row,poz+xsz-2,"│","lightgray","black");
            }

            // menu items
            var currow=2;
            for (var mi=0;mi<this.menuOptions[mnum].options.length;mi++)
            {
                const menuvoice=this.menuOptions[mnum].options[mi].name;

                if (menuvoice==this.separatorName)
                {
                    fb.putPixel(currow,poz-1,"├","lightgray","black");

                    fb.drawHorizontalLine(currow,poz,poz+xsz-1,"─","lightgray","black");

                    fb.putPixel(currow,poz+xsz-2,"┤","lightgray","black");
                }
                else
                {
                    var bgColll="lightgray";

                    if (this.menuOptions[mnum].options[mi].highlighted)
                    {
                        fb.drawHorizontalLine(currow,poz,poz+xsz-2,"x","#00A800","#00A800");
                        bgColll="#00A800";
                    }

                    if (this.menuOptions[mnum].options[mi].enabled)
                    {
                        // first letter
                        const firstLetter=menuvoice[0];
                        fb.printString(poz,currow,firstLetter,bgColll,"#A80000");
                        // rest of the string
                        fb.printString(poz+1,currow,menuvoice.substring(1),bgColll,"black");
                    }
                    else
                    {
                        fb.printString(poz,currow,menuvoice,bgColll,"gray");
                    }
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
        if (this.drawState==1)
        {
            this.initialAnimCounter+=3;
        }
    }

    draw(fb)
    {
        if (this.drawState==0)
        {
            fb.drawHorizontalLine(0,0,fb.numCols,"\u2588","black","black");
            return;
        }

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

        if (this.drawState==1)
        {
            fb.drawHorizontalLine(0,this.initialAnimCounter,fb.numCols,"\u2588","black","black");
        }
    }
}
