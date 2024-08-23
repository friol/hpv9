/* help! I need somebody help! not just anybody */

class cHelpWindow extends cWindow
{
    constructor(px,py,title,dimx,dimy,bgColor,parentGui)
    {
        super(px,py,title,dimx,dimy,bgColor,parentGui);

        this.helpText=
        [
        "<br> Hello! <br> <br> If you are reading this, you are seeking for help. "+
        "So you probably noticed that this is an old "+
        "<link_href='https://en.wikipedia.org/wiki/Text-based_user_interface'> text_based_UI </link> , "+
        "something that was the hype in mid 90s, before the <link_href='https://en.wikipedia.org/wiki/Graphical_user_interface'> bitmapped_GUIs </link> "+
        "took the stage. <br> <br> "+
        "In my opinion, this is fascinating and quite versatile. I wrote a lot of "+
        "<link_href='https://en.wikipedia.org/wiki/Borland_C%2B%2B'> Borland_C++ </link> programs "+
        "in a GUI like this (compiling took more than 2 minutes, but this is another story). <br> <br> "+
        "Feel free to <link_href='1'> browse_around </link> , and visit the bunch of links in the above menu. <br> "+
        "Ah, to close this window, push the little green square above on the left. But you already "+
        "knew that, huh? <br> <br> "+
        "Friol signin' off. <br> ",

        "<br> Oh, I didn't mention that this help text is an *hyper*-text too. <br> <br> So "+
        "you can navigate those links internally or <link_href='0'> return_back </link> . "+
        "<br> <br> This hypertext thingie reminds me of an old form of literature that were the "+
        "<link_href='https://en.wikipedia.org/wiki/Gamebook'> gamebooks </link> , books read only by nerds "+
        "which you can now find at vintage markets for exorbitant prices. Hmmm, I should have not thrown "+
        "away those books. <br> <br> "+
        "By the way, do you want to <link_href='2'> hit_the_monster </link> with your sword, "+
        "or <link_href='3'> withdraw_fastly </link> towards the valley?",

        "<br> Unfortunately, as in any gamebook that has this name, you are too weak "+
        "to defeat a seven-arm monster, and you are dead. <br> <br> The lucky side of things "+
        "is that you can always <link_href='0'> start_again </link> .",

        "<br> Hmmm, now that I think of it, you were seeking for help "+
        "and you have somehow been teleported instead in a medieval world with monsters and hyperlinks. <br> <br> "+
        "If you think today is not the right day for an adventure, feel free to safely return to the <link_href='0'> homepage </link> ."+
        "Instead, if you feel brave, you can turn back and try to <link_href='2'> attack_the_monster </link> or walk "+
        "towards an <link_href='4'> old_house </link> that has smoke coming from its chimney and a nice green roof.",

        "<br> You reach the old house and enter the rusty old door. Then you enter the old corridor, which is "+
        "lighted by old candles on rusty candlesticks. Everything seems rusty and old. It's an old house, indeed. "+
        "<br> <br> On the left you see a vast room from which strange sounds of monsters are coming, but on the right there is "+
        "what seems to be an old bookshelf room, very quiet and silent. <br> <br> "+
        "It's time to choose: <link_href='5'> left </link> or <link_href='6'> right </link> ?",

        "<br> You continue to try to defeat seven-arm monsters, but even if you had a chance, "+
        "there are seven of them in this room. You are fastly divided in seven equal parts. <br> <br> The fun (fun?) side of things "+
        "is that you can always <link_href='0'> start_again </link> .",

        "<br> You enter the bookshelf room, and there is a old, dusty (and rusty) book "+
        "on the desk, whose title seems to be 'Hypertexts, Volume I'. <br> <br> You slowly open it, and "+
        "immediately notice a paragraph that starts with the sentence: 'If you need help, press F1'. <br> <br> "+
        "A big pink link-like word lies underneath, and it says <br> <br> <link_href='0'> Home </link> "
        ];

        this.currentText=0;

        this.mouseRelativeX=0;
        this.mouseRelativeY=0;

        this.clickPending=false;
    }

    handleMessage(msgType,msgPayload)
    {
        super.handleMessage(msgType,msgPayload);

        if (msgType==messageTypesEnum.MSG_MOUSEMOVE)
        {
            const mousex=msgPayload[0];
            const mousey=msgPayload[1];

            this.mouseRelativeX=mousex-this.posx-2;
            this.mouseRelativeY=mousey-this.posy-1;
        }
        else if (msgType==messageTypesEnum.MSG_MOUSECLICK)
        {
            const mousex=msgPayload[0];
            const mousey=msgPayload[1];

            this.mouseRelativeX=mousex-this.posx-2;
            this.mouseRelativeY=mousey-this.posy-1;

            this.clickPending=true;
        }
    }

    update()
    {
        super.update();

    }

    printHelpMessage(fb)
    {
        const maxChars=this.width-2;
        var lineNum=0;
        var wordArr=this.helpText[this.currentText].split(" ");
        var curLine="";
        var xpos=0;
        var curColor="yellow";
        var curAnchor="";
        for (var w=0;w<wordArr.length;w++)
        {
            const curWord=wordArr[w];
            const cwss=curWord.substring(0,5);
            if (curWord.substring(0,5)=="<link")
            {
                curColor="pink";
                curAnchor=curWord.substring(curWord.indexOf("'")+1,curWord.lastIndexOf("'"));
            }
            else if (curWord=="</link>")
            {
                curColor="yellow";
                curAnchor="";
            }
            else if (curWord=="<br>")
            {
                lineNum+=1;
                xpos=0;
                curLine="";
            }
            else if (curWord=="")
            {
            }
            else 
            {
                if ((curLine+" "+curWord).length<maxChars)
                {
                    curLine+=" "+curWord;
                }
                else
                {
                    curLine=curWord+" ";
                    lineNum+=1;
                    xpos=0;
                }

                if (curColor=="pink")
                {
                    if (this.mouseRelativeY==lineNum)
                    {
                        if ((this.mouseRelativeX>=xpos)&&(this.mouseRelativeX<(xpos+curWord.length)))
                        {
                            fb.printString(this.posx+2+xpos,this.posy+1+lineNum,curWord,"#00A800",curColor);
                            if (this.clickPending)
                            {
                                if (curAnchor.substring(0,4)=="http")
                                {
                                    window.open(curAnchor, '_blank').focus();
                                }
                                else
                                {
                                    // hypertext hyperlink
                                    this.currentText=parseInt(curAnchor);
                                }
                            }
                        }
                        else
                        {
                            fb.printString(this.posx+2+xpos,this.posy+1+lineNum,curWord,this.bgColor,curColor);
                        }
                    }
                    else
                    {
                        fb.printString(this.posx+2+xpos,this.posy+1+lineNum,curWord,this.bgColor,curColor);
                    }
                }
                else
                {
                    fb.printString(this.posx+2+xpos,this.posy+1+lineNum,curWord,this.bgColor,curColor);
                }
                xpos+=curWord.length+1;
            }
        }

        this.clickPending=false;
    }

    draw(fb)
    {
        super.draw(fb);

        if (this.displayPhase==0) return;

        this.printHelpMessage(fb);

        //fb.printString(this.posx+30,this.posy,this.mouseRelativeX+" "+this.mouseRelativeY,this.bgColor,"yellow");
    }
}
