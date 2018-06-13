
class Item {
    constructor() {
        this.id;
        this.posX;
        this.posY;

        this.color;

        this.level;
        this.xp = 0;

        this.life = 1000;
        this.currentLife = 1000;
        this.atk=0;
        this.def=0;
        this.spd=0;
        this.atkSpd=0;
        this.rng=0;

        this.lastHitTime = new Date().getTime();
        this.target;
    }

    init() {
        this.posX=random(width)
        this.posY=random(height)
        this.randomStats(500)
        this.level = 1;
    };

    levelUp(){
        this.level+=1;
        this.randomStats(100)
        console.log("LVL UP ! Now level "+this.level);
        console.log(this);
        
    }

    randomStats(count){
        var startPoints = count;

        var currendPoints = 0;
        var randLife = Math.floor(random(startPoints));
        currendPoints = startPoints - randLife;
        var randAtk = Math.floor(random(currendPoints));
        currendPoints = currendPoints - randAtk;
        var randDef = Math.floor(random(currendPoints));
        currendPoints = currendPoints - randDef;
        var randSpd = Math.floor(random(currendPoints));
        currendPoints = currendPoints - randSpd;
        var randAtkSpd = Math.floor(random(currendPoints));
        currendPoints = currendPoints - randAtkSpd;
        var randRng = Math.floor(random(currendPoints));

        this.life += randLife;
        this.atk += randAtk;
        this.def += randDef;
        this.spd += randSpd;
        this.atkSpd += randAtkSpd;
        this.rng += randRng;
        this.currentLife = this.life
    }

    addXp(value){
        this.xp += value;
        var requieredXp = 10 + (this.level * 10);
        if(this.xp >= requieredXp){
            this.xp = 0;
            this.levelUp()
            this.currentLife = this.life
        }
    }

    draw() {
        //Draw robot
        stroke(127, 63, 120);
        fill(255, 0, 0,127);
        ellipse(this.posX, this.posY, 10 + this.rng, 10 + this.rng);
        fill(204, 101, 192);
        rect(this.posX, this.posY, 10, 10);

        //Draw Life Bar
        fill(162, 165, 160);
        stroke(0, 0, 0);
        rect(this.posX, this.posY -70, 150, 10);
        var healthWidth = Math.floor(this.currentLife * 150 / this.life);
        fill(255, 0, 0);
        rect(this.posX-((150 - healthWidth)/2), this.posY -70, healthWidth, 10);
        textSize(12);
        text('lvl '+ this.level, this.posX -50, this.posY);

        //Draw XP Bar
        fill(162, 165, 160);
        stroke(150, 155, 147);
        rect(this.posX, this.posY -50, 150, 10);
        var requieredXp = 100 + (this.level * 10);
        var xpWidth = Math.floor(this.xp * 150 / requieredXp);
        fill(255, 247, 35);
        rect(this.posX-((150 - xpWidth)/2), this.posY -50, xpWidth, 10);
    };

    drawLinkTarget(){
        if(this.target != undefined){
            stroke(255);
            line(this.posX, this.posY, this.target.posX, this.target.posY);
        }
    }

    moveToTarget(){
        //console.log(this.target)
        var X = Math.abs(this.target.posX - this.posX);
        var Y = Math.abs(this.target.posY < this.posY)
        var sqrY = Y*Y
        var sqrX = X*X
        var sqrDistance = sqrX+sqrY
        var sqrRng = (10+this.rng)*(10+this.rng);
        
        if( sqrDistance < sqrRng ){
            this.hit()
        }else{
            if(this.target.posX >= this.posX){
                this.posX += 1*(this.level/2);
            }else if(this.target.posX < this.posX){
                this.posX -= 1*(this.level/2);
            }
            if(this.target.posY >= this.posY){
                this.posY += 1*(this.level/2);
            }else if(this.target.posY < this.posY){
                this.posY -= 1*(this.level/2);
            }
        }
    }

    hit(){
        if(this.target.currentLife > this.atk /* && (new Date().getTime() - this.lastHitTime) > (1000 - (this.atkSpd*2))*/){
            this.target.currentLife -= this.atk - this.target.def > 0 ? this.atk - this.target.def : 0 ;
        }else{
            this.target.currentLife = 0;
            this.addXp(this.target.level * 50);
            this.target = undefined
        }
    }
}