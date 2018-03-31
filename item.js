
var Item = function(id, posX, posY,itemSize,type,imageItem) {
    //this.type 
    this.id = id;
    this.posX = posX;
    this.posY = posY;
    this.isBusy = false;
    this.color;
    this.size = itemSize;
    var img = imageItem;


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
       dWidth = img.width/7;
       dHeight = img.height /5;
       image(img,this.posX, this.posY,[sWidth=this.size],[sHeight=this.size],[dx=0],[dy=0],[dWidth],[dHeight])
    }

    this.loadItemType = function(type){
        var itemJson = loadJSON("properties/items.json");
        
        this.color = color(itemJson.baseGreenItem["colorR"],itemJson.baseGreenItem["colorG"],itemJson.baseGreenItem["colorB"]);
        return itemJson.type;
    }
};