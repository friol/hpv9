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

    printString(x0,y0,theString,bgColor,fgColor)
    {
        for (var c=x0;c<theString.length+x0;c++)
        {
            this.framebuffer[y0][c].character=theString[c-x0];            
            this.framebuffer[y0][c].bgColor=bgColor;            
            this.framebuffer[y0][c].fgColor=fgColor;            
        }
    }

    blit()
    {
        const outputDiv=document.getElementById(this.drawDivName);

        var theHTML="";
        for (var r=0;r<this.numRows;r++)
        {
            for (var c=0;c<this.numCols;c++)
            {
                theHTML+="<span style=\"color:"+this.framebuffer[r][c].fgColor+
                ";background-color:"+this.framebuffer[r][c].bgColor+"\">"+this.framebuffer[r][c].character+"</span>";                
            }
            theHTML+="<br/>";
        }

        outputDiv.innerHTML=theHTML;
    }
}
