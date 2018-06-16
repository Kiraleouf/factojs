
class Item {
    constructor() {
        this.baseMoveSpeed = 2;
        this.id;
        this.posX;
        this.posY;

        this.color;

        this.level=0;
        this.xp = 0;

        this.life = 1000;
        this.currentLife = 1;
        this.atk=0;
        this.def=0;
        this.spd=0;
        this.atkSpd=0;
        this.rng=20;

        this.strong = false;

        this.lastHitTime = new Date().getTime();
        this.target;

        this.baseBarWidth = 30;

        this.shouldHeal = false;
    }

    init(maxLevel, team) {
        this.posX=(team == 0 ? 0 : (width/10*9)) + random(width/10);
        this.posY=random(height);
        this.strong = random(100)<10 ? true : false;
        this.randomStats(500);
        var baselvl = this.strong ? 1+(maxLevel/2)+this.level+Math.round(this.level + (maxLevel/2)) : 1 +Math.round(random(maxLevel));
        for(var i = 0; i < baselvl; i++){
            this.levelUp();
        }
        return this;
    };

    initWithLevel(level, team) {
        this.posX=(team == 0 ? 0 : (width/10*9)) + random(width/10);
        this.posY=random(height);
        this.randomStats(500);
        this.strong = random(100)<10 ? true : false;
        var baselvl = this.strong ? Math.round(level + (level/2)) : level;
        for(var i = 0; i < baselvl; i++){
            this.levelUp();
        }
        return this;
    };

    levelUp(){
        this.level+=1;
        this.randomStats(100)
        this.life += this.strong ? 10*2 : 10;
        this.atk += this.strong ? 5*2:5;
        this.def += this.strong ? 5*2:5;
        this.spd += this.spd > 25 ? 0 : this.strong ? 5*2:5;
        this.atkSpd += this.strong ? 5*2 :5;
        //this.rng += 1;
        this.currentLife = this.life
        
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
        var randSpd = this.spd > 25 ? 0 : Math.round(random(currendPoints));
        currendPoints = currendPoints - randSpd;
        var randAtkSpd = currendPoints;

        this.life += randLife;
        this.atk += randAtk;
        this.def += randDef;
        this.spd += randSpd;
        this.atkSpd += randAtkSpd;
        //this.rng += randRng;
        this.currentLife = this.life
    }

    addXp(value){
        this.xp += this.strong ? value*2 : value;
        var requieredXp = this.level * 100
        if(this.xp >= requieredXp){
            this.xp = 0;
            this.levelUp()
            this.currentLife = this.life
        }
    }

    draw(team) {
        //Draw robot
        strokeWeight(this.strong ? 3 : 1);
        stroke(0)
        noFill();
        ellipse(this.posX, this.posY, 20 + this.rng, 20 + this.rng);
        fill(team == 0 ? 255 : 0, 0, team == 1 ? 255 : 0);
        stroke(0,0,0);
        rect(this.posX, this.posY, 25, 25);
        strokeWeight(1);

        //Draw Life Bar
        fill(162, 165, 160);
        stroke(0, 0, 0);
        rect(this.posX, this.posY -35,  this.baseBarWidth, 5);
        var healthWidth = Math.floor(this.currentLife *  this.baseBarWidth / this.life);
        fill(255, 0, 0);
        rect(this.posX-((this.baseBarWidth - healthWidth)/2), this.posY -35, healthWidth, 5);
        textSize(15);
        fill(255, 255, 255);
        text('lvl '+ this.level, this.posX -35, this.posY);

        //Draw XP Bar
        fill(255, 255, 255);
        stroke(0,0, 0);
        rect(this.posX, this.posY -30,  this.baseBarWidth, 5);
        var requieredXp = this.level * 100;
        var xpWidth = Math.floor(this.xp * this.baseBarWidth /  requieredXp );
        fill(255, 247, 35);
        rect(this.posX-(( this.baseBarWidth - xpWidth)/2), this.posY -30, xpWidth, 5);
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
                    var moveFactor = this.baseMoveSpeed*this.spd/25;
                    if(moveFactor*moveFactor > sqrDistance)moveFactor=sqrDistance
                    if(this.target.posX >= this.posX+5){
                        this.posX = this.posX + moveFactor > width ? width : this.posX + moveFactor;
                    }else if(this.target.posX < this.posX-5){
                        this.posX = this.posX - moveFactor <= 0 ? 0 : this.posX - moveFactor;
                    }
                    if(this.target.posY >= this.posY+5){
                        this.posY = this.posY + moveFactor > height ? height : this.posY + moveFactor;
                    }else if(this.target.posY < this.posY-5){
                        this.posY = this.posY - moveFactor <= 0 ? 0 : this.posY - moveFactor;
                    }
                }
            }
        }
    }

    setSpeed(speed){
        this.baseMoveSpeed = speed;
    }

    healMe(){
        if(this.target instanceof Heal){
            var amount = this.target.healMe(this.life-this.currentLife)
            this.currentLife += amount;
            this.compute()
        }
    }

    hit(){
        if((new Date().getTime() - this.lastHitTime) > (500 - (this.atkSpd*2*this.baseMoveSpeed))){
            if(this.target.currentLife > this.atk){
                this.target.currentLife -= this.atk - this.target.def > 0 ? this.atk : this.atk/2 ;
                this.lastHitTime = new Date().getTime()
            }else{
                this.target.currentLife = 0;
                var midxp = this.requieredXp/2;
                this.addXp(this.target.level * 50);
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