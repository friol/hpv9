/* the DOS shell */

class cDOSShell
{
    constructor()
    {
        this.dirData=[
            {"filename":"command.com","filesize":"12459","filedate":"13/06/2022","filehour":"12:23","isDirectory":false,"dirContents":null},
            {"filename":"ibm.sys","filesize":"31337","filedate":"31/02/1985","filehour":"13:37","isDirectory":false,"dirContents":null},
            {"filename":"format.com","filesize":"12459","filedate":"13/06/2022","filehour":"12:23","isDirectory":false,"dirContents":null},
            {"filename":"debug.com","filesize":"12459","filedate":"13/06/2022","filehour":"12:23","isDirectory":false,"dirContents":null},
            {"filename":"hpv9.exe","filesize":"13082024","filedate":"13/08/2024","filehour":"14:05","isDirectory":false,"dirContents":null},
            {"filename":"dir1","filesize":"0","filedate":"13/08/2024","filehour":"14:05","isDirectory":true,"dirContents":
                [
                    {"filename":"readme.txt","filesize":"124","filedate":"13/06/2022","filehour":"12:23","isDirectory":false,"dirContents":null},
                    {"filename":"virus.com","filesize":"1024","filedate":"13/08/2024","filehour":"14:05","isDirectory":false,"dirContents":null},
                ]
            },
        ];

        this.curRow=4;
        this.listOfRows=[
            "",
            "friol DOS version 0.1b",
            "Copyright The Oil Inc. 1982,1983",
            "",
            "C:\>"
        ];

        this.cursorAnim=0;
        this.curCommand="";

        this.fbPtr=null;
    }

    handleMessage(msgType,msgPayload)
    {
        if (msgType==messageTypesEnum.MSG_KEYDOWN)
        {
            const key=msgPayload[0];

            if ((key>='a')&&(key<='z'))
            {
                this.curCommand+=key;
            }
            else if ((key>='0')&&(key<='9'))
            {
                this.curCommand+=key;
            }
            else if (key=="Enter")
            {
                this.executeCommand();
            }
        }
    }

    update()
    {
        this.cursorAnim++;
    }

    eventualScroll()
    {
        if (this.curRow>=(this.fbPtr.numRows-1))
        {
            const rowsToRemove=this.curRow-this.fbPtr.numRows+1;
            for (var r=0;r<rowsToRemove;r++)
            {
                this.listOfRows.shift();
            }

            this.curRow-=rowsToRemove;
        }
    }

    executeVer()
    {
        this.listOfRows.push("");
        this.listOfRows.push("friol DOS v0.1");
        this.listOfRows.push("");
        this.listOfRows.push("C:\>");

        this.curRow+=4;
        this.eventualScroll();
    }

    unknownCommand()
    {
        this.listOfRows.push("");
        this.listOfRows.push("Unrecognized command");
        this.listOfRows.push("");
        this.listOfRows.push("C:\>");

        this.curRow+=4;
        this.eventualScroll();
    }

    executeCommand()
    {
        const cmd=this.curCommand;

        this.listOfRows[this.curRow]+=this.curCommand;
        this.curCommand="";

        if (cmd=="ver")
        {
            this.executeVer();
        }
        else
        {
            this.unknownCommand();
        }
    }

    writeToConsole(s,fb,r)
    {
        fb.printString(0,r," "+s,"black","gray");
    }

    draw(fb)
    {
        if (this.fbPtr==null) this.fbPtr=fb;

        const fbw=fb.numCols;
        const fbh=fb.numRows;

        for (var r=0;r<fbh;r++)
        {
            for (var c=0;c<fbw;c++)
            {
                fb.framebuffer[r][c].character="█";
                fb.framebuffer[r][c].bgColor="black";
                fb.framebuffer[r][c].fgColor="black";
            }
        }

        for (var r=0;r<this.listOfRows.length;r++)
        {
            this.writeToConsole(this.listOfRows[r],fb,r);
        }

        // draw curcommand
        fb.printString(this.listOfRows[this.curRow].length+1,this.curRow,this.curCommand,"black","gray");

        // draw cursor
        var cursorVal=" ";
        if ((this.cursorAnim%100)<50) cursorVal="█";
        fb.printString(this.listOfRows[this.curRow].length+1+this.curCommand.length,this.curRow,cursorVal,"black","gray");
    }
}
