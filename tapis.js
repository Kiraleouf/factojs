class Tapis{
    constructor(posX, posY, beltType, dir){
        this.posX = posX;
        this.posY = posY;
        this.beltType = this.type.beltType;
        this.dir = dir;
        this.itemsHandled = [];

        this.type = {
            T1: {
                MAX_ITEMS_HANDLE_PER_SEC: "15"
            },
            T2: {
                MAX_ITEMS_HANDLE_PER_SEC: "30"
            },
            T3: {
                MAX_ITEMS_HANDLE_PER_SEC: "45"
            }
        };


    }

    draw(){

    }

    
}