/* 
    snake! (on a plane) 
    a lot of code ripp...reused from https://github.com/friol/oppd/blob/master/opadTemplate/day05.cpp
*/

class cSnakeWindow extends cWindow
{
    constructor(px,py,title,dimx,dimy,bgColor,parentGui)
    {
        super(px,py,title,dimx,dimy,bgColor,parentGui);

        this.updateFreq=4;
        this.updateCounter=this.updateFreq;

        this.gameState=0; // 0:playing, 1:hit a wall, so stopped, 2:paused
        this.score=0;
        this.lives=3;

        this.body=[];
        this.direction=3; // 0 up, 1 right, 2 down, 3 left
        this.growPhase=0;

        this.increment = 
        [
            [0,-1],[1,0],[0,1],[-1,0]
        ];        

        // 0: empty space, 1: wall, 2:fruit
        this.gridXsize=dimx-2;
        this.gridYsize=dimy-6;
        this.grid=new Array();
        for (var r=0;r<this.gridYsize;r++)
        {
            var newRow=new Array();
            for (var c=0;c<this.gridXsize;c++)
            {
                if ((r==0)||(c==0)||(r==(this.gridYsize-1))||(c==(this.gridXsize-1)))
                {
                    newRow.push(1);
                }
                else
                {
                    newRow.push(0);
                }
            }

            this.grid.push(newRow);
        }

        this.makeSnake();

        this.generateRandomFruit();

        this.pauseButton=new cButton(4,this.targetHeight-3,"Pause!",this.bgColor,"#00A800","white",this.targetPosx,this.targetPosy,this.onPauseButt,this);
        this.restartButton=new cButton(38,this.targetHeight-3,"Restart!",this.bgColor,"#00A800","white",this.targetPosx,this.targetPosy,this.onRestartButt,this);
    }

    makeSnake()
    {
        const initialSnakeLen=5;

        var iniPosX = Math.floor(this.gridXsize / 2);
		var iniPosY = Math.floor(this.gridYsize / 2);

        this.body=[];
		for (var p = 0;p < initialSnakeLen; p++)
		{
			var pos = [ iniPosX,iniPosY ];
			this.body.push(pos);
			iniPosX -= this.increment[this.direction][0];
			iniPosY -= this.increment[this.direction][1];
		}        
    }

    onPauseButt(parent)
    {
        if (parent.gameState==1) return;
        if (parent.gameState==0) parent.gameState=2;
        else parent.gameState=0;
    }

    onRestartButt(parent)
    {
        for (var row=0;row<parent.grid.length;row++)        
        {
            for (var col=0;col<parent.grid[row].length;col++)
            {
                if (parent.grid[row][col]==2) parent.grid[row][col]=0;
            }
        }

        parent.direction=3;
        parent.growPhase=0;        
        parent.makeSnake();
        parent.generateRandomFruit();
        parent.score=0;
        parent.gameState=0;
    }

    generateRandomFruit()
    {
        var found=false;

        while (!found)
        {
            var fx=Math.floor(Math.random()*(this.gridXsize-2))+1;
            var fy=Math.floor(Math.random()*(this.gridYsize-2))+1;

            var hit=false;
            for (var p=0;p<this.body.length;p++)
            {
                if ((fx==this.body[p][0])&&(fy==this.body[p][1]))
                {
                    hit=true;
                }
            }

            if (!hit) 
            {
                found=true;
                this.grid[fy][fx]=2;
            }
        }
    }

    update()
    {
        super.update();

        if (this.displayPhase==0)
        {
            this.pauseButton.updateParentPos(this.posx,this.posy);
            this.restartButton.updateParentPos(this.posx,this.posy);
        }

        if (this.dragging) return; // no updates when dragging
        if ((this.gameState==1)||(this.gameState==2)) return;

        this.updateCounter--;
        if (this.updateCounter>0) return;
        this.updateCounter=this.updateFreq;

        var newEl = [ this.body[0][0],this.body[0][1] ];
		newEl[0] += this.increment[this.direction][0];
		newEl[1] += this.increment[this.direction][1];
		this.body.unshift(newEl);
		
		if (this.growPhase == 0)
		{
			this.body.pop();
		}
		else
		{
			this.growPhase--;
		}

        var hpx = newEl[0];
		var hpy = newEl[1];

		var val = this.grid[newEl[1]][newEl[0]];

		// 0 all ok, 1 hit a fruit, 2 hit a wall
		
		// check if we hit ourselves
		for (var p = 1;p < this.body.length;p++)
		{
			if ((newEl[0] == this.body[p][0]) && (newEl[1] == this.body[p][1])) 
            {
                // hit ourselves
                this.gameState=1;
                break;
            }
		}

        if (val==1) // hit a wall
        {
            this.gameState=1;
        }
        else if (val==2) // fruit
        {
            this.score+=10;
            this.growPhase=3;
            this.grid[newEl[1]][newEl[0]]=0;
            this.generateRandomFruit();
        }
    }

    handleMessage(msgType,msgPayload)
    {
        super.handleMessage(msgType,msgPayload);

        if (msgType==messageTypesEnum.MSG_KEYDOWN)
        {
            var dir;
            const k=msgPayload[0];
            if (k=="ArrowUp") dir=0;
            else if (k=="ArrowRight") dir=1;
            else if (k=="ArrowDown") dir=2;
            else if (k=="ArrowLeft") dir=3;

            if ((this.direction == 0) && (dir == 2)) return;
            if ((this.direction == 2) && (dir == 0)) return;
            if ((this.direction == 1) && (dir == 3)) return;
            if ((this.direction == 3) && (dir == 1)) return;
    
            this.direction = dir;            
        }

        if (this.dragging)
        {
            this.pauseButton.updateParentPos(this.posx,this.posy);
            this.restartButton.updateParentPos(this.posx,this.posy);
        }

        this.pauseButton.handleMessage(msgType,msgPayload);
        this.restartButton.handleMessage(msgType,msgPayload);
    }

    draw(fb)
    {
        super.draw(fb);

        if (this.displayPhase==0) return;

        fb.printString(this.posx+2,this.posy+1,"Score:"+this.score,this.bgColor,"yellow");

        // draw grid
        for (var r=0;r<this.grid.length;r++)
        {
            for (var c=0;c<this.grid[r].length;c++)
            {
                if (this.grid[r][c]==1) fb.putPixel(this.posy+r+2,this.posx+c+1,"█",this.bgColor,"gray");
                if (this.grid[r][c]==2) fb.putPixel(this.posy+r+2,this.posx+c+1,"*",this.bgColor,"yellow");
            }
        }

        // draw snake
        for (var p=0;p<this.body.length;p++)
        {
            fb.putPixel(this.posy+this.body[p][1]+2,this.posx+this.body[p][0]+1,"▒",this.bgColor,"gray");
        }

        if (this.gameState==1)
        {
            fb.putPixel(this.posy+this.body[0][1]+2,this.posx+this.body[0][0]+1,"+",this.bgColor,"gray");
        }

        this.pauseButton.draw(fb);
        this.restartButton.draw(fb);

        if (this.gameState==2)
        {
            const cx=(this.width-"Paused!".length)>>1;
            const cy=this.height>>1;

            fb.printString(this.posx+cx,this.posy+cy,"Pausedd!",this.bgColor,"yellow");
        }
    }
}
