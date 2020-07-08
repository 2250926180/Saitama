//创建格子数组
var nums = new Array(4);
for(var i=0;i<4;i++){
    nums[i] = new Array(4);
}

var arraylen = 4;
var score = 0;

var gameStatus=true;

window.onload = function(){
    this.newgame();
}
//新开始游戏
function newgame(){
    init();
    generateRandomNumber();
    generateRandomNumber();
    setTimeout("updateView()",400);
}
//初始化游戏界面
function init(){
    gameStatus = true;
    score = 0;
    document.getElementById("score").innerHTML = score;
    //设置gameover框属性为隐藏
    $("#gameover").css('display','none');
    //为界面每个格子计算位置
    for(var i = 0;i<arraylen;i++){
        for(var j = 0;j<arraylen;j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));
        }
    }
    //初始化格子数组
    for(var i = 0;i<arraylen;i++){
        for(var j = 0;j<arraylen;j++){
            nums[i][j]=0;
        }
    }
}



//更新视图
function updateView(){
    $(".number-cell").remove();
    for(var i = 0;i<arraylen;i++){
        for(var j = 0;j<arraylen;j++){
           $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
           var curNumCell =  $('#number-cell-'+i+'-'+j);
           if(nums[i][j]!=0){
            curNumCell.css('width','100px');
            curNumCell.css('hegiht','100px');
            curNumCell.css('top',getPosTop(i,j));
            curNumCell.css('left',getPosLeft(i,j));
            curNumCell.css('background-color',getNumBgcolor(nums[i][j]));
            curNumCell.css('color',getNumFgcolor(nums[i][j]));
            curNumCell.text(nums[i][j]);
           }
        }
    }
}

//在格子随机生成数字
function generateRandomNumber(){
    if(isNoSpace(nums)) return false;

    var randomX ,randomY;
    while(true){
       randomX = Math.floor(Math.random()*10%4);
       randomY = Math.floor(Math.random()*10%4);
       if(nums[randomX][randomY] === 0) break;
    }
    var randNumber = Math.random()<0.5 ? 2 : 4;
    nums[randomX][randomY] = randNumber;
    updateGenerateNumber(randomX,randomY);
    showNumberAnimation(randomX,randomY,randNumber);
}

function updateGenerateNumber(randomX,randomY){
    $("#grid-container").append('<div class="number-cell" id="number-cell-'+randomX+'-'+randomY+'"></div>');
    var genNumCell = $('#number-cell-'+randomX+'-'+randomY);
    genNumCell.css('width','0px');
    genNumCell.css('hegiht','0px');
    genNumCell.css('top',getPosTop(randomX,randomY));
    genNumCell.css('left',getPosLeft(randomX,randomY));
}


$(document).keydown(function(event){
    if(gameStatus){
        var key = event.keyCode;
        switch(key){
            case 37:
                if(moveLeft()){
                    updateScore();
                    setTimeout("isGameOver()",400);
                }
                break;
            case 65:
                if(moveLeft()){
                    updateScore();
                    setTimeout("isGameOver()",400);
                }
                break;
            case 38:
                if(moveUp()){
                    updateScore();
                    setTimeout("isGameOver()",400);
                }
                break;
            case 87:
                if(moveUp()){
                    updateScore();
                    setTimeout("isGameOver()",400);
                }
                break;
            case 39:
                if(moveRight()){
                    updateScore();
                    setTimeout("isGameOver()",400);
                }
                break;
            case 68:
                if(moveRight()){
                    updateScore();
                    setTimeout("isGameOver()",400);
                }
                break;
            case 40:
                if(moveDown()){
                    updateScore();
                    setTimeout("isGameOver()",400);
                }
                break;
            case 83:
                if(moveDown()){
                    updateScore();
                    setTimeout("isGameOver()",400);
                }
                break;
        }
    }
    
})

$(document).on("touchstart", function(e) {
    startX = e.originalEvent.changedTouches[0].pageX,
    startY = e.originalEvent.changedTouches[0].pageY;
});
$(document).on("touchmove", function(e) {
    moveEndX = e.originalEvent.changedTouches[0].pageX,
    moveEndY = e.originalEvent.changedTouches[0].pageY,
    X = moveEndX - startX,
    Y = moveEndY - startY;
    if(Math.abs(X)>Math.abs(Y)){
        if ( X > 0 ) {
            if(moveRight()){
                updateScore();
                setTimeout("isGameOver()",400);
            }
        }
        else if ( X < 0 ) {
            if(moveLeft()){
                updateScore();
                setTimeout("isGameOver()",400);
            }
        }
    }
    else{
        if ( Y > 0) {
            if(moveDown()){
                updateScore();
                setTimeout("isGameOver()",400);
            }
        }
        else if ( Y < 0 ) {
            if(moveUp()){
                updateScore();
                setTimeout("isGameOver()",400);
            }
        }
    }
});





//向左移动 ←   *
function moveLeft(){
    if(!canMoveLeft())return false;

    var nextI,k;
    for(var i=0;i<arraylen;i++){
        for(var j=0;j<arraylen-1;j++){
            nextI = -1;
            k=j+1;
            while(k<arraylen && nums[i][k] === 0 )k++;
            if(k<arraylen)nextI = k;
            if(nextI!=-1){
                if(nums[i][j]===0){
                    showMoveAnimation(i,nextI,i,j);
                    nums[i][j] = nums[i][nextI];
                    nums[i][nextI] = 0;
                    j--;
                }
                else if(nums[i][j]===nums[i][nextI]){
                    showMoveAnimation(i,nextI,i,j);
                    nums[i][j] = nums[i][nextI]*2;
                    score+=nums[i][j];
                    nums[i][nextI] = 0;
                }
            }
            else break;
        }
    }
    setTimeout("updateView()",200);
    setTimeout("generateRandomNumber()",200);
    return true;
}


//向上移动 ↑   *
function moveUp(){
    if(!canMoveUp())return false;

    var nextI,k;
    for(var i=0;i<arraylen;i++){
        for(var j=0;j<arraylen-1;j++){
            nextI = -1;
            k=j+1;
            while(k<arraylen && nums[k][i] === 0) k++;
            if(k<arraylen) nextI = k;
            if(nextI!=-1){
                if(nums[j][i]===0){
                    showMoveAnimation(nextI,i,j,i);
                    nums[j][i] = nums[nextI][i];
                    nums[nextI][i] = 0;
                    j--;
                }
                else if(nums[j][i]===nums[nextI][i]){
                    showMoveAnimation(nextI,i,j,i);
                    nums[j][i] = nums[nextI][i]*2;
                    score+=nums[j][i];
                    nums[nextI][i] = 0;
                }
            }
            else break;
        }
    }
    setTimeout("updateView()",200);
    setTimeout("generateRandomNumber()",200);
    return true;
}
//向右移动 →   *
function moveRight(){
    if(!canMoveRight())return false;
    //  0 0 0 0
    var nextI,k;
    for(var i=0;i<arraylen;i++){
        for(var j=arraylen-1;j>0;j--){
            nextI = -1;
            k=j-1;
            while(k>=0 && nums[i][k] === 0 )k--;
            if(k>=0)nextI = k;
            if(nextI!=-1){
                if(nums[i][j]===0){
                    showMoveAnimation(i,nextI,i,j);
                    nums[i][j] = nums[i][nextI];
                    nums[i][nextI] = 0;
                    j++;
                }
                else if(nums[i][j]===nums[i][nextI]){
                    showMoveAnimation(i,nextI,i,j);
                    nums[i][j] = nums[i][nextI]*2;
                    score+=nums[i][j];
                    nums[i][nextI] = 0;
                }
            }
            else break;
        }
    }
    setTimeout("updateView()",200);
    setTimeout("generateRandomNumber()",200);
    return true;
}
//向下移动 ↓
function moveDown(){
    if(!canMoveDown())return false;
    // 0
    // 0
    // 0
    // 0
    var nextI,k;
    for(var i=0;i<arraylen;i++){
        for(var j=arraylen-1;j>0;j--){
            nextI = -1;
            k=j-1;
            while(k>=0 && nums[k][i] === 0) k--;
            if(k>=0) nextI = k;
            if(nextI!=-1){
                if(nums[j][i]===0){
                    showMoveAnimation(nextI,i,j,i);
                    nums[j][i] = nums[nextI][i];
                    nums[nextI][i] = 0;
                    j++;
                }
                else if(nums[j][i]===nums[nextI][i]){
                    showMoveAnimation(nextI,i,j,i);
                    nums[j][i] = nums[nextI][i]*2;
                    score+=nums[j][i];
                    nums[nextI][i] = 0;
                }
            }
            else break;
        }
    }
    setTimeout("updateView()",200);
    setTimeout("generateRandomNumber()",200);
    return true;
}








