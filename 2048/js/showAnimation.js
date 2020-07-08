function showNumberAnimation(i, j,randNumber) {//实现随机数字的样式变动
 
    var numberCell = $('#number-cell-' + i + '-' + j);
    numberCell.css("background-color", getNumBgcolor(randNumber));
    numberCell.css("color", getNumFgcolor(randNumber));
    numberCell.text(randNumber);
    
    numberCell.animate({
        width : "100px",
        height : "100px",
    }, 50);
}
//方块从起点到终点的移动动画
function showMoveAnimation(fromX,fromY,toX,toY){
    var numberCell = $('#number-cell-'+fromX +'-'+fromY);
    numberCell.animate({
        top:getPosTop(toX,toY),
        left:getPosLeft(toX,toY)
    },200);
}







