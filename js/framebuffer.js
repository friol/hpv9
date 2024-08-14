/* fb */

class cFrameBuffer
{
    constructor(windoww,windowh,drawDiv)
    {
        this.fontxsize=9;
        this.fontysize=16;

        const numCols=Math.floor(windoww/this.fontxsize)-4;
        const numRows=Math.floor(windowh/this.fontysize)-4;

        console.log("Allocating text framebuffer with "+numRows+" rows and "+numCols+" columns");

        this.framebuffer=new Array();
        for (var r=0;r<numRows+10;r++)
        {
            var newRow=new Array();
            
            for (var c=0;c<numCols+10;c++)
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
            ["#c0c0c0","#909090"],
            ["white","gray"],
            ["gray","#505050"],
            ["#2020c0","#1010a0"],
            ["yellow","olive"],
            ["#c02020","#901010"]
        ]
    }

    putPixel(row,col,charz,bgColor,fgColor)
    {
        if ((row>=0)&&(row<this.numRows))
        {
            if ((col>=0)&&(col<this.numCols))
            {
                this.framebuffer[row][col].character=charz;                
                this.framebuffer[row][col].bgColor=bgColor;                
                this.framebuffer[row][col].fgColor=fgColor;                
            }
        }
    }

    drawHorizontalLine(row,x0,x1,charz,bgColor,fgColor)
    {
        for (var c=x0;c<x1;c++)        
        {
            this.putPixel(row,c,charz,bgColor,fgColor);
        }
    }

    shadowize(row,col)
    {
        if ((row<0)||(row>this.numRows-1)||(col<0)||(col>this.numCols-1)) return;

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

            this.putPixel(y0,c,ch,bgColor,fg);
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
                    var chr=this.framebuffer[r][c].character;
                    if (chr=="<") chr="&lt;";
                    if (chr==">") chr="&gt;";
                    thisLine+="</span><span style=\"color:"+this.framebuffer[r][c].fgColor+
                        ";background-color:"+this.framebuffer[r][c].bgColor+"\">"+chr;

                    oldFg=this.framebuffer[r][c].fgColor;
                    oldBg=this.framebuffer[r][c].bgColor;
                }
                else
                {
                    var chr=this.framebuffer[r][c].character;
                    if (chr=="<") chr="&lt;";
                    if (chr==">") chr="&gt;";
                    thisLine+=chr;                
                }
            }
            theHTML+=thisLine+"</span><br/>";
        }

        outputDiv.innerHTML=theHTML;
    }
}
