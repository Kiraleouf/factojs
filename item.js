var Item = function(id, posX, posY,itemSize,type) {
    this.type = loadItemType(type);
    this.id = id;
    this.posX = posX;
    this.posY = posY;
    this.isBusy = false;
    this.color;
    this.size = itemSize;


    this.itemPop = function(){
        console.log("POPPED");
    }

    this.draw = function(){
        stroke(255);
        fill(this.color)
        rect(this.posX, this.posY, this.size, this.size);
    }

    this.loadItemType = function(type){
        var itemJson = loadJSON("properties/items.json");
        
        this.color = color(itemJson.type["colorR"],itemJson.type["colorG"],itemJson.type["colorB"]);

        return itemJson.type;
    }
};