class Graph {
    constructor(){
        this.score = new Array();
    }

    init(){
        this.score[0] = 0;
        this.score[1] = 0;
        this.update()
    }

    addScore(team){
        this.score[team]+=1;
        this.update()
    }

    update(){
        var totalScore = this.score[0]+this.score[1];
        var maxWidth = (width / 4);
        var redWidth = this.score[0] * maxWidth / totalScore;
        var blueWidth =  this.score[1] * maxWidth / totalScore;
        var content = '<div id="red" style="width: '+ redWidth +'px;">'+this.score[0]+'</div>';
        content += '<div id="blue" style="width:'+ blueWidth +'px;">'+this.score[1]+'</div>';
        document.getElementById('chart').innerHTML = content;
    }

}