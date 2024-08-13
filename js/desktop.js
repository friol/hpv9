/* desktop */

class cDesktop
{
    constructor()
    {
        this.priority=-10000;
        this.windowTitle="TheDesktop";
        this.drawState=0; // 0: all blacks, 1 composing, 2 done
        this.initialAnimCounter=0;
    }

    handleMessage(msgType,msgPayload)
    {
    }

    update()
    {
        if (this.drawState==1)
        {
            this.initialAnimCounter+=1;
        }
    }

    draw(fb)
    {
        const fbw=fb.numCols;
        const fbh=fb.numRows;

        var bgCol="lightgray";
        var fgCol="#0507c0";

        if (this.drawState==0)
        {
            for (var r=0;r<fbh;r++)
            {
                for (var c=0;c<fbw;c++)
                {
                    fb.framebuffer[r][c].character="░";
                    fb.framebuffer[r][c].bgColor="black";
                    fb.framebuffer[r][c].fgColor="black";
                }
            }
        }
        else if (this.drawState==1)
        {
            const centerRow=fb.numRows>>1;

            // background
            for (var r=0;r<fbh;r++)
            {
                for (var c=0;c<fbw;c++)
                {
                    var abz=Math.abs(centerRow-r);
                    if (abz<this.initialAnimCounter)
                    {
                        fb.framebuffer[r][c].character="░";
                        fb.framebuffer[r][c].bgColor="lightgray";
                        fb.framebuffer[r][c].fgColor="#0507c0";
                    }
                    else
                    {
                        fb.framebuffer[r][c].character="░";
                        fb.framebuffer[r][c].bgColor="black";
                        fb.framebuffer[r][c].fgColor="#0507c0";
                    }
                }
            }
        }
        else
        {
            for (var r=0;r<fbh;r++)
            {
                for (var c=0;c<fbw;c++)
                {
                    fb.framebuffer[r][c].character="░";
                    fb.framebuffer[r][c].bgColor="lightgray";
                    fb.framebuffer[r][c].fgColor="#0507c0";
                }
            }
        }
    }
}
