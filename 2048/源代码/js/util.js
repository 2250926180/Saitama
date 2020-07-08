
//获取单个格子在界面中距离顶端的相对位置
function getPosTop(i,j){
    return 20 + i*120;
}
//获取单个格子在界面中距离左端的相对位置
function getPosLeft(i,j){
    return 20 + j*120;
}

//更新分数
function updateScore(){
    document.getElementById("score").innerHTML = score;
}

//判断格子是否已满
function isNoSpace(){
    for(var i = 0;i<arraylen;i++){
        for(var j = 0;j<arraylen;j++){
            if(nums[i][j]==0)return false;
        }
    }
    return true;
}
//能否向左移动  *
function canMoveLeft(){
    var i,j;
    for(i = 0;i<arraylen;i++){
        for(j=arraylen-1;j>=0;j--)if(nums[i][j]!==0)break;
        for(j;j>=0;j--){
            if(nums[i][j]===0||j>0 && nums[i][j]===nums[i][j-1])return true;
        }
    }
    return false;
}
//能否向上移动  *
function canMoveUp(){
    var i,j;
    for(i = 0;i<arraylen;i++){
        for(j=arraylen-1;j>=0;j--)if(nums[j][i]!==0)break;
        for(j;j>=0;j--){
            if(nums[j][i]===0||j>0 && nums[j][i]===nums[j-1][i])return true;
        }
    }
    return false;
}
//能否想右移动
function canMoveRight(){
    var i,j;
    for(var i = 0;i<arraylen;i++){
        for(j=0;j<arraylen;j++)if(nums[i][j]!==0)break;
        for(j;j<arraylen;j++){
            if(nums[i][j]===0||j<arraylen-1 && nums[i][j]===nums[i][j+1])return true;
        }
    }
    return false;
}
//能否想下移动  *
function canMoveDown(){
    var i,j;
    for(i = 0;i<arraylen;i++){
        for(j=0;j<arraylen;j++)if(nums[j][i]!==0)break;
        for(j;j<arraylen;j++){
            if(nums[j][i]===0 || j<arraylen-1 && nums[j][i]===nums[j+1][i])return true;
        }
    }
    return false;
}

//游戏结束判定
function isGameOver(){
    if(!canMoveLeft()&&!canMoveUp()&&!canMoveRight()&&!canMoveDown()&&isNoSpace){
        $("#gameover").css('display','block');
        if(gameStatus){
            $("span#gameover").remove();
            $("#gameover").append('<span id="overscore"></span>');
            $("#overscore").text(score);
        }

        gameStatus = false;
        
    }
}

//获取数字的背景色
function getNumBgcolor(number){
    switch(number){
        case 2:
            return "#eee4da";
        case 4:
            return "#ede0c8";
        case 8:
            return "#f2b179";
        case 16:
            return "#f59563";
        case 32:
            return "#f67c5f";
        case 64:
            return "#f65e3b";
        case 128:
            return "#edcf72";
        case 256:
            return "#edcc61";
        case 512:
            return "#edc850";
        case 1024:
            return "#edc53f";
        case 2048:
            return "#edc22d";
        case 4096:
            return "#fe3b3d";
        case 8192:
            return "#fd1e1f";
    }
}

function getNumFgcolor(number){
    if(number<=4) return "776e65";
    else return "ffffff";
}






