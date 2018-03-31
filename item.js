var Item = function(id, posX, posY,itemSize,type,image) {
    this.type 
    this.id = id;
    this.posX = posX;
    this.posY = posY;
    this.isBusy = false;
    this.color;
    this.size = itemSize;
    var img = image;


    this.itemPop = function(){
        console.log("POPPED");
    }

    this.draw = function(){
        if(type == null) type = this.loadItemType(type);
        /*
        stroke(255);
        fill(this.color)
        rect(this.posX, this.posY, this.size, this.size);
        */
       image(img,[sx=0],[sy=0],[sWidth=img.width],[sHeight=img.height],[dx=0],[dy=0],[dWidth],[dHeight])
    }

    this.loadItemType = function(type){
        var itemJson = loadJSON("properties/items.json");
        this.color = color(itemJson.type["colorR"],itemJson.type["colorG"],itemJson.type["colorB"]);
        return itemJson.type;
    }
};