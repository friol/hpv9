/* upper mac-style dos-style menu bar */

class cMenuBar
{
    constructor()
    {
        this.menuOptions=[
            {
                "name":"File",
                "options":
                [
                    "Open",
                    "Save",
                    "Save as",
                    "Preferences"
                ]
            },
            {
                "name":"Photos",
                "options":
                [
                    "Dolomites",
                    "Portugal",
                    "USA",
                    "Rome",
                    "Italy"
                ]
            }

        ];

    }

    draw(fb)
    {
        // upper menu
        fb.drawHorizontalLine(0,0,fb.numCols,"\u2588","lightgray","lightgray");

        // hamburger
        fb.framebuffer[0][1].character="\u2CB7";
        fb.framebuffer[0][1].bgColor="lightgray";
        fb.framebuffer[0][1].fgColor="red";

        // draw menu names
        var poz=4;
        for (var m=0;m<this.menuOptions.length;m++)
        {
            fb.printString(poz,0,this.menuOptions[m].name,"lightgray","black");
            poz+=2;
            poz+=this.menuOptions[m].name.length;
        }
    
    }
}
