
var Item = function(id, posX, posY,itemSize,type,image) {
    //this.type 
    this.id = id;
    this.posX = posX;
    this.posY = posY;
    this.isBusy = false;
    this.color;
    this.size = itemSize;
    this.img = image;


    this.itemPop = function(){
        console.log("POPPED");
    }

    this.draw = function(){
        //if(type == null) type = this.loadItemType(type);
        /*
        stroke(255);
        fill(this.color)
        rect(this.posX, this.posY, this.size, this.size);
        */
       dWidth = this.img.width/7;
       dHeight = this.img.height /5;
       image(this.img,0,0);
    }

    this.loadItemType = function(type){
        var itemJson = loadJSON("properties/items.json");
        
        this.color = color(itemJson.baseGreenItem["colorR"],itemJson.baseGreenItem["colorG"],itemJson.baseGreenItem["colorB"]);
        return itemJson.type;
    }
};