var Crafter = function(posX, posY, rotation, crafters, blockWidth, receipe, type,globalList) {

    this.positionX = posX;
    this.positionY = posY;
    this.rotation = rotation;
    this.crafters = crafters;
    this.blockWidth = blockWidth;
    this.itemsGlobalList = globalList;
    this.receipe = this.loadReceipe(receipe);
    this.properties = this.loadProperties(type);
    this.lastInput = Date.now();
    this.busy = false;
    this.items = new Array();
    this.time;
    this.itemsNeeded = new Array();
    this.mapItemReceipe = new Map();

    this.crafterType = this.loadProperties(type);

    this.present = function(x,y){
        for(var i=0;i<crafters.length;i++){
            if(crafters[i].posX == this.posX && crafters[i].posY == this.posY){
                return true;
            }
        }
        return false;
    }

    this.drawCrafter = function(x,y,xDraw,yDraw,direction){
        stroke(0);
        fill(color(this.properties.colorR,this.properties.colorG,this.properties.colorB));
        rect(xDraw,yDraw,this.blockWidth,this.blockWidth);
        fill(color(0,0,0));
        switch(direction){
          case 0: 
            var baseX = xDraw+(this.blockWidth/2);
            var baseY = yDraw + 10
            triangle(baseX, baseY, baseX-5, baseY+5, baseX+5, baseY+5);
          break;
          case 1: 
            var baseX = xDraw+(this.blockWidth)-15;
            var baseY = yDraw+(this.blockWidth/2)
            triangle(baseX, baseY-5, baseX, baseY+5, baseX+5, baseY);
          break;
          case 2: 
          var baseX = xDraw+(this.blockWidth/2);
          var baseY = yDraw+this.blockWidth -20
          triangle(baseX, baseY+10, baseX-5, baseY+5, baseX+5, baseY+5);
          break;
          case 3: 
          var baseX = xDraw+15;
          var baseY = yDraw+(this.blockWidth/2)
          triangle(baseX, baseY-5, baseX, baseY+5, baseX-5, baseY);
          break;
        }
    }

    this.loadProperties = function(type){
        var propertiesList = loadJSON("properties/crafter_properties.json");
        return propertiesList[type];

    }

    this.loadItem = function(item){
        if(this.items.indexOf(item) == -1){
            if(this.receipe != null){
                if(this.checkReceipeItems(item)){
                    this.items.push(item);
                }     
            }else{
                this.items.push(item)
            }
        }
    }

    this.loadReceipe = function(receipe){
        var receipes = loadJSON("properties/receipes.json");
        this.items = new Array();
        this.time = receipes[receipe].time;
        this.itemsToCraft = receipes[receipe].itemsNeeded;
        return receipes.receipe;
    }

    this.craftItem = function(){
        if(this.canCraft){
            if(!this.busy){
                if(this.time - (Date.now() - this.properties.craftSpeed ))
                this.busy = true;
                this.mapItemReceipe = new Map();
                for(var i = 0; i < this.items.length; i++){
                    if(this.itemsGlobalList.indexOf(this.items[i]) != -1){
                        this.itemsGlobalList.pop(this.items[i]);
                    }
                }

                this.items = new Array();
                this.itemsGlobalList.push(new Item(this.randomUUID(), this.positionX + 5, this.positionY + 5, this.receipe.amountProduced, this.receipe.name));
            }
        }
    }

    /*
        Vérification des items requis pour le craft.
        Pour chaque item de la liste d'items du crafter
            Pour chaque items requis de la recette
                On vérifie si l'item requis correspond à l'item à vérifier
                SI oui, 
                    On parcours la map des vérifications
                    SI l'item à vérifier est déjà connu par la map 
                        Alors on incrémente la valeur associée
                        On renvoie VRAI.
                    SINON  
                        On crée une nouvelle entrée dans la map avec une valeur à 1
        On renvoie FAUX.
    */
    this.checkReceipeItems = function(item){
        for(var itm in this.items){
            for(var rcpItem in this.receipe.itemsNeeded){
                if(itm.type === rcpItem.type){
                    for(var [key, val] of this.mapItemReceipe.entries()){
                        if(key === type){
                            this.mapItemReceipe.set(type, val++);
                            if(this.checkCanCraft()){
                                this.canCraft = true;
                                this.craftItem();
                            }
                            return true;
                        }else{
                            this.mapItemReceipe.set(type, 1);
                            if(this.checkCanCraft()){
                                this.canCraft = true;
                                this.craftItem();
                            }
                            return true;
                        }
                    }
                }                 
            }
        }
        return false;
    }

    this.checkCanCraft = function(){
        var result = false;
        for(var item in this.itemsNeeded){
            for([key, val] of this.mapItemReceipe.entries()){
                if(item.type === key){
                    if(item.amount === val){
                        this.result = true;
                    }
                }
            }
        }
        return result;
    }

    this.randomUUID = function(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
    }
}