/* desktop */

class cDesktop
{
    constructor()
    {
    }

    handleMessage(msgType,msgPayload)
    {
    }

    draw(fb)
    {
        const fbw=fb.numCols;
        const fbh=fb.numRows;

        // uniform background
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
