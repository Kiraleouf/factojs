
var Item = function(id, posX, posY,itemSize,itemType,imageItem) {
    this.typeItm; 
    this.idItm = id;
    this.posX = posX;
    this.posY = posY;
    this.isBusy = false;
    this.colorItem;
    this.sizeItm = itemSize;
    var img = imageItem;


    this.itemPop = function(){
        console.log("POPPED");
    }

    this.draw = function(){
        this.typeItm = this.loadItemType(itemType);
        
        if(this.typeItm != null){
            stroke(255);
            fill(this.colorItm)
            rect(this.posX, this.posY, this.sizeItm, this.sizeItm);
            
            dWidth = img.width/7;
            dHeight = img.height /5;
            image(img,this.posX, this.posY,[sWidth=this.sizeItm],[sHeight=this.sizeItm],[dx=0],[dy=0],[dWidth],[dHeight])
        }
    }

    this.loadItemType = function(type){
        var itemJson;
        loadJSON("properties/items.json",function(resp){
            itemJson = resp;
            console.log(itemJson);
            console.log(itemJson.baseGreenItem)
            console.log(itemJson.baseGreenItem.colorR)
            console.log(itemJson.baseGreenItem["colorR"])
            
            this.colorItem = color(itemJson.baseGreenItem["colorR"],itemJson.baseGreenItem["colorG"],itemJson.baseGreenItem["colorB"]);
            return itemJson.typeItm;
        });
    }
};