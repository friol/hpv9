/* fb */

class cFrameBuffer
{
    constructor(windoww,windowh,drawDiv)
    {
        this.fontxsize=9;
        this.fontysize=16;

        const numCols=Math.floor(windoww/this.fontxsize);
        const numRows=Math.floor(windowh/this.fontysize);

        console.log("Allocating text framebuffer with "+numRows+" rows and "+numCols+" columns");

        this.framebuffer=new Array();
        for (var r=0;r<numRows;r++)
        {
            var newRow=new Array();
            
            for (var c=0;c<numCols;c++)
            {
                newRow.push({"character":" ","fgColor":"#6495ED","bgColor":"#DCDCDC"});
            }
            
            this.framebuffer.push(newRow);
        }

        this.numCols=numCols;
        this.numRows=numRows;

        this.drawDivName=drawDiv;

        this.shadowMap=[
            ["lightgray","darkgray"],
            ["#0507c0","#0304a0"],
        ]
    }

    drawHorizontalLine(row,x0,x1,character,bgColor,fgColor)
    {
        for (var c=x0;c<x1;c++)        
        {
            this.framebuffer[row][c].character=character;            
            this.framebuffer[row][c].bgColor=bgColor;            
            this.framebuffer[row][c].fgColor=fgColor;            
        }
    }

    shadowize(row,col)
    {
        const bg=this.framebuffer[row][col].bgColor;
        const fg=this.framebuffer[row][col].fgColor;

        for (var c=0;c<this.shadowMap.length;c++)
        {
            if (this.shadowMap[c][0]==bg) this.framebuffer[row][col].bgColor=this.shadowMap[c][1];
            if (this.shadowMap[c][0]==fg) this.framebuffer[row][col].fgColor=this.shadowMap[c][1];
        }
    }

    printString(x0,y0,theString,bgColor,fgColor)
    {
        for (var c=x0;c<theString.length+x0;c++)
        {
            var ch=theString[c-x0];
            var fg=fgColor;
            if (ch==" ") { ch="\u2588"; fg=bgColor; }

            this.framebuffer[y0][c].character=ch;            
            this.framebuffer[y0][c].bgColor=bgColor;            
            this.framebuffer[y0][c].fgColor=fg;            
        }
    }

    blit()
    {
        // optimizing the inner algo
        const outputDiv=document.getElementById(this.drawDivName);

        var theHTML="";
        for (var r=0;r<this.numRows;r++)
        {
            var oldBg="NA";
            var oldFg="NA";
            var thisLine="<span style=\"color:"+this.framebuffer[r][0].fgColor+";background-color:"+this.framebuffer[r][0].bgColor+"\">";
            for (var c=0;c<this.numCols;c++)
            {
                if ((c!=0)&&((oldFg!=this.framebuffer[r][c].fgColor)||(oldBg!=this.framebuffer[r][c].bgColor)))
                {
                    thisLine+="</span><span style=\"color:"+this.framebuffer[r][c].fgColor+
                        ";background-color:"+this.framebuffer[r][c].bgColor+"\">"+this.framebuffer[r][c].character;

                    oldFg=this.framebuffer[r][c].fgColor;
                    oldBg=this.framebuffer[r][c].bgColor;
                }
                else
                {
                    thisLine+=this.framebuffer[r][c].character;                
                }
            }
            theHTML+=thisLine+"</span><br/>";
        }

        outputDiv.innerHTML=theHTML;
    }
}
