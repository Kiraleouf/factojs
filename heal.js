class Heal {
    constructor() {
        this.id;
        this.posX;
        this.posY;

        this.width = 30;
        this.height = 30;

        this.level;

        this.lifeToGive = 1000;
        this.over = false;
    }

    init() {
        this.posX=random(width)
        this.posY=random(height)
        this.level = 1;
    };

    draw() {
        fill(255,0,0);
        rect(this.posX, this.posY, this.width, this.height);
        fill(255,255,255);
        textSize(15+this.level);
        text('remain : '+ this.lifeToGive, this.posX , this.posY);
    };

    healMe(amount){
        if(amount > this.lifeToGive){
            this.over = true;
            this.lifeToGive = 0;
            return this.lifeToGive;
        }else{
            this.lifeToGive-=amount;
            return amount;
        }
    }

    isOver(){
        return this.over;
    }
}