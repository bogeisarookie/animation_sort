
    // 思路是记录每一次交换的节点下标
    // 但是如何动画？：采用定时器一点点移动，移动完了之后要和数组一样将节点也移动，
    // 做法是在原来的节点之前插入新节点，同时删除老节点。
    //还可以采用动画展示交换，之后采用更新字标的方式更新显示，这样不会操作DOM。
var arr = [1, 2, 3, 4, 5];
let container = document.getElementsByClassName('container')[0];
function bubble(arr) {
    let len = arr.length;
    var exchange = [];
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i; j++) {
            if (arr[j] < arr[j + 1]) {
                let temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
                exchange.push([j, j + 1]);
            }
        }
    }
    return exchange;
}

function init() {

    for (let index in arr) {
        let dom = document.createElement("div");
        dom.className = "item";
        dom.innerText = arr[index];
        dom.style.left = 150 * index + 1 + "px";        
       container.appendChild(dom);
    }
    let exchange=bubble(arr);
    let index=0;
    draw(index,exchange);

}
function draw(index,exchange) { 
    if(index<exchange.length){
        let items=document.getElementsByClassName('item');
        let left=items[exchange[index][0]];
        let right=items[exchange[index][1]];
        let leftLeft = parseInt(left.style.left);
        let rightLeft = parseInt(right.style.left);
        let leftMove = leftLeft, rightMove = rightLeft;
        let firstInterval = setInterval(()=>{
            if (leftMove <= rightLeft) {
                left.style.left = leftMove + "px";
                right.style.left = rightMove + "px";
                leftMove = leftMove + 10;
                rightMove = rightMove - 10;                       
            } else {//移动完毕，添加新dom删除旧dom
                let firstDom = left.cloneNode(true);
                let lastDom = right.cloneNode(true);
                
                container.insertBefore(firstDom,right);
                container.insertBefore(lastDom,left);
                left.remove();
                right.remove();
                clearInterval(firstInterval);
                index++;
                draw(index,exchange);
            }
        },100);
    }
 }
 init();