
class Item {
    constructor() {
        this.baseMoveSpeed = 2;
        this.id;
        this.posX;
        this.posY;

        this.color;

        this.level;
        this.xp = 0;

        this.life = 1000;
        this.currentLife = 1;
        this.atk=0;
        this.def=0;
        this.spd=0;
        this.atkSpd=0;
        this.rng=0;

        this.lastHitTime = new Date().getTime();
        this.target;

        this.shouldHeal = false;
    }

    init() {
        this.posX=random(width)
        this.posY=random(height)
        this.randomStats(500)
        this.level = Math.round(random(10));
        this.randomStats(500+(100*this.level))
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
        var randLife = Math.round(random(startPoints));
        currendPoints = startPoints - randLife;
        var randAtk = Math.round(random(currendPoints));
        currendPoints = currendPoints - randAtk;
        var randDef = Math.round(random(currendPoints));
        currendPoints = currendPoints - randDef;
        var randSpd = Math.round(random(currendPoints));
        currendPoints = currendPoints - randSpd;
        var randAtkSpd = Math.round(random(currendPoints));
        currendPoints = currendPoints - randAtkSpd;
        var randRng = Math.round(random(currendPoints));

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
        ellipse(this.posX, this.posY, 20 + this.rng, 20 + this.rng);
        fill(204, 101, 192);
        rect(this.posX, this.posY, 10, 10);

        //Draw Life Bar
        fill(162, 165, 160);
        stroke(0, 0, 0);
        rect(this.posX, this.posY -70, 150, 10);
        var healthWidth = Math.floor(this.currentLife * 150 / this.life);
        fill(255, 0, 0);
        rect(this.posX-((150 - healthWidth)/2), this.posY -70, healthWidth, 10);
        textSize(15+this.level);
        fill(255, 255, 255);
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
        if(this.target != undefined){
            if(this.target instanceof Heal && this.target.isOver()){
                this.target = undefined
            }else{
                //console.log(this.target)
                var X = Math.abs(this.target.posX - this.posX);
                var Y = Math.abs(this.target.posY - this.posY)

                var sqrY = Y*Y
                var sqrX = X*X
                var sqrDistance = sqrX+sqrY
                var sqrRng = (20+this.rng)*(20+this.rng);
                var targetHeal = this.target instanceof Heal

                if( sqrDistance < sqrRng){
                    if(targetHeal){
                        this.healMe();
                    }else{
                        this.hit()
                    }
                }else{
                    if(this.target.posX >= this.posX+5){
                        this.posX += this.baseMoveSpeed*(this.level/5);
                    }else if(this.target.posX < this.posX-5){
                        this.posX -= this.baseMoveSpeed*(this.level/5);
                    }
                    if(this.target.posY >= this.posY+5){
                        this.posY += this.baseMoveSpeed*(this.level/5);
                    }else if(this.target.posY < this.posY-5){
                        this.posY -= this.baseMoveSpeed*(this.level/5);
                    }
                }
            }
        }
    }

    healMe(){
        if(this.target instanceof Heal){
            this.currentLife+=this.target.healMe(this.life-this.currentLife)
            this.compute()
        }
    }

    hit(){
        if((new Date().getTime() - this.lastHitTime) > (500 - (this.atkSpd*2))){
            if(this.target.currentLife > this.atk){
                this.target.currentLife -= this.atk - this.target.def > 0 ? this.atk : this.atk/2 ;
                console.log("FIGHT ! made "+ (this.atk - this.target.def > 0 ? this.atk : this.atk/2) +"dmg");
                
                this.lastHitTime = new Date().getTime()
            }else{
                this.target.currentLife = 0;
                this.addXp(this.target.level * 10);
                this.target = undefined
            }
        }
    }

    compute(){
        if(this.currentLife*100/this.life <= 50){
            this.shouldHeal = true;
        }else{ 
            this.shouldHeal = false;
        }
    }



    toString(){
        return "Item ID : "+this.id+" \n"+"Item lvl : "+this.level+" \n" +"Item life : "+this.life+" \n" +"Item atk : "+this.atk+" \n" 
        +"Item def : "+this.def+" \n"+"Item spd : "+this.spd+" \n"+"Item atkSpd : "+this.atkSpd+" \n"+"Item range : "+this.rng;
    }
}