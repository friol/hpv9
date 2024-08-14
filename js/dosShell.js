/* the DOS shell */

class cDOSShell
{
    constructor()
    {
        this.dirLevel=0;
        this.dirPath=[];
        this.fullPath=["C:"];
        this.dirData=[
            {"filename":"command.com","filesize":"12459","filedate":"13/06/2022","filehour":"12:23","isDirectory":false,"dirContents":null},
            {"filename":"ibm.sys","filesize":"31337","filedate":"31/02/1985","filehour":"13:37","isDirectory":false,"dirContents":null},
            {"filename":"format.com","filesize":"12459","filedate":"13/06/2022","filehour":"12:23","isDirectory":false,"dirContents":null},
            {"filename":"debug.com","filesize":"12459","filedate":"13/06/2022","filehour":"12:23","isDirectory":false,"dirContents":null},
            {"filename":"hpv9.exe","filesize":"13082024","filedate":"13/08/2024","filehour":"14:05","isDirectory":false,"dirContents":null},
            {"filename":"test","filesize":"0","filedate":"13/08/2024","filehour":"14:05","isDirectory":true,"dirContents":
                [
                    {"filename":"readme.txt","filesize":"124","filedate":"13/06/2022","filehour":"12:23","isDirectory":false,"dirContents":null},
                    {"filename":"virus.com","filesize":"1024","filedate":"13/08/2024","filehour":"14:05","isDirectory":false,"dirContents":null},
                ]
            },
            {"filename":"hotstuff","filesize":"0","filedate":"14/08/2024","filehour":"12:34","isDirectory":true,"dirContents":
                [
                    {"filename":"lenna.jpg","filesize":"29993","filedate":"01/02/1970","filehour":"21:22","isDirectory":false,"dirContents":null},
                ]
            }
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
            else if (key==" ")
            {
                this.curCommand+=" ";
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

    getCurrentPath()
    {
        var cp="";
        for (var el=0;el<this.fullPath.length;el++)
        {
            cp+=this.fullPath[el]+"\\";
        }

        return cp;
    }

    executeVer()
    {
        this.listOfRows.push("");
        this.listOfRows.push("friol DOS v0.1");
        this.listOfRows.push("");
        this.listOfRows.push(this.getCurrentPath()+">");

        this.curRow+=4;
        this.eventualScroll();
    }

    unknownCommand()
    {
        this.listOfRows.push("");
        this.listOfRows.push("Unrecognized command");
        this.listOfRows.push("");
        this.listOfRows.push(this.getCurrentPath()+">");

        this.curRow+=4;
        this.eventualScroll();
    }

    showCurrentDir()
    {
        var dirPtr=this.dirData;
        var lev=0;
        for (var l=0;l<this.dirLevel;l++)        
        {
            const ndp=dirPtr[this.dirPath[l]];
            dirPtr=dirPtr[this.dirPath[l]].dirContents;
        }

        var totEntries=0;

        // directories first
        for (var e=0;e<dirPtr.length;e++)
        {
            if (dirPtr[e].isDirectory)
            {
                var fname=dirPtr[e].filename.toUpperCase();
                fname=fname.padEnd(8," ");

                var fdate=dirPtr[e].filedate.replace(/\//g, '-');
                fdate=fdate.padStart(12," ");

                var fhour=dirPtr[e].filehour;

                this.listOfRows.push(fname+"      <DIR>      "+fdate+"  "+fhour);
                totEntries+=1;
            }
        }
    
        for (var e=0;e<dirPtr.length;e++)
        {
            if (!dirPtr[e].isDirectory)
            {
                var fname=dirPtr[e].filename.substring(0,dirPtr[e].filename.indexOf("."));
                var fext=dirPtr[e].filename.substring(dirPtr[e].filename.indexOf(".")+1);

                fname=fname.padEnd(8," ");
                fext=fext.padEnd(5," ");

                var fsize=dirPtr[e].filesize.toString();
                fsize=fsize.padStart(10," ");

                var fdate=dirPtr[e].filedate.replace(/\//g, '-');
                fdate=fdate.padStart(12," ");

                var fhour=dirPtr[e].filehour;

                this.listOfRows.push(fname.toUpperCase()+" "+fext.toUpperCase()+" "+fsize+fdate+"  "+fhour);
                totEntries+=1;
            }
        }

        return totEntries;
    }

    executeDir()
    {
        this.listOfRows.push("");
        this.listOfRows.push(" Volume in drive C is THEOIL");
        this.listOfRows.push(" Volume Serial Number is 1337-D00D");
        this.listOfRows.push(" Directory of C:\\");
        this.listOfRows.push("");
        var additionalRows=this.showCurrentDir();
        this.listOfRows.push("");
        this.listOfRows.push(this.getCurrentPath()+">");

        this.curRow+=7+additionalRows;
        this.eventualScroll();
    }

    executeCd(dir2cd2)
    {
        console.log("Trying to cd to directory "+dir2cd2);

        var dirPtr=this.dirData;
        var lev=0;
        for (var l=0;l<this.dirLevel;l++)        
        {
            dirPtr=dirPtr[this.dirPath[l]]["dirContents"];
        }

        var dirFound=false;
        var dirPoz=0;
        for (var e=0;e<dirPtr.length;e++)
        {
            if ((dirPtr[e].filename==dir2cd2)&&(dirPtr[e].isDirectory))
            {
                //console.log("Ok, dir found");
                dirFound=true;
                dirPoz=e;
            }
        }

        if (!dirFound)
        {
            this.listOfRows.push("");
            this.listOfRows.push("Error: directory "+dir2cd2+" not found");
            this.listOfRows.push("");
            this.listOfRows.push(this.getCurrentPath()+">");
    
            this.curRow+=4;
            this.eventualScroll();
            return;
        }

        this.dirLevel+=1;
        this.dirPath.push(dirPoz);
        this.fullPath.push(dir2cd2);

        this.listOfRows.push("");
        this.listOfRows.push("cd cmd "+dir2cd2);
        this.listOfRows.push("");
        this.listOfRows.push(this.getCurrentPath()+">");

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
        else if (cmd=="dir")
        {
            this.executeDir();
        }
        else if (cmd.substring(0,2)=="cd")
        {
            this.executeCd(cmd.substring(3));
        }
        else if (cmd=="")
        {
            this.listOfRows.push("");
            this.listOfRows.push(this.getCurrentPath()+">");
            this.curRow+=2;
            this.eventualScroll();
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
