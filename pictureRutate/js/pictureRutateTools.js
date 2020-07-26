var pictureRutate = (function(obj){
  //obj.btnTop,obj.btnBottom,obj.offset,obj.boxWid
  var boxImgBox  = document.querySelector(".box-img");
  var boxImg     = boxImgBox.querySelectorAll("img");
  var picBoxUl   = obj.box.querySelector("ul");
  
  // 获取到父盒子的视图宽度 也就是父盒子的实际宽度 要减去对应的border padding 左右相加
  obj.boxWid = obj.boxWid || obj.box.offsetWidth -10;
  obj.box.style.width = obj.boxWid + "px";
  
  // 偏移量
  obj.offset = obj.boxWid / (obj.offset || 20);
  if (obj.boxWid % obj.offset != 0){
    alert("抱歉你的盒子宽度不合要求，请为父盒子添加合适的宽度。请设置盒子宽度能被"+obj.offset+"整除的宽");
  };
  
  // 小点点根据图片的多少来添加多少
  for (let i=0; i<boxImg.length-1; i++){
    picBoxUl.innerHTML += "<li></li>";
  }
  // 获取到所有点
  var picBoxLi   = obj.box.querySelectorAll("li");
  
  // 动态变换轮播盒子的宽度
  boxImgBox.style.width = boxImg.length*100 + "%";
  
  // 动态设置每个图片的宽度 子盒子的宽加起来要等于父盒子的宽
  for (let i=0; i<boxImg.length; i++){
    boxImg[i].style.width = 100 / boxImg.length + "%";
  }
  
  // 轮播盒子偏移量
  var left  = 0;
  // 图片索引
  var index = 0;
  // 初始化渲染第一个点
  select(index);
  // 声明一个小点点选中时触发的事件
  function select(index){
    for (let i=0; i<picBoxLi.length; i++){
      if (index == i){
        picBoxLi[i].style.backgroundColor = "#fff";
      } else {
        picBoxLi[i].style.backgroundColor = "red";
      }
    }
  }
  // 把定时器的返回值定义在外部方便之后清除定时器
  var times;
  var time;
  // 判断按钮是否可点击 修复定时器BUG
  var isTime = true;
  var isDestination  = true;
  // 定时轮播
  function timing(){
    // 关闭上一个定时器 定时器返回值会自增
    clearInterval(times);
    // 从新开启一个新的定时器
    times = setInterval(function(){
      if (isTime){
        // 轮播到最后一张 回到起点继续轮播
        if (index == boxImg.length-1){
          left = 0;
          index = 0;
        }
        // 索引自增
        index++;
        // 小点点渲染
        if (index == boxImg.length-1){
          select(0);
        } else {
          select(index);
        }
        // 开始轮播
        carousel(obj.boxWid*index);
      }
    },2000);
  };
  timing();
  
  // 偏移的距离
  function carousel(distance){
    if (isDestination){
      // 关闭上一个定时器 定时器返回值会自增
      clearInterval(time);
      isDestination = false;
      time = setInterval(function(){
        if (distance == left){
          isTime = true;
          isDestination = true;
          clearInterval(time);
        } else if (distance > left){
          boxImgBox.style.left = -(left += obj.offset) +'px';
        } else {
          boxImgBox.style.left = -(left -= obj.offset) +'px';
        }
      },16);
    }
  };
  
  // 给小点点绑定点击事件
  for (let i=0; i<picBoxLi.length; i++){
    picBoxLi[i].onclick = function (){
      if (isTime){
        isTime = false;
        isDestination = true;
        // 把点击的小点点和索引关联起来
        index = i;
        // 从新渲染被点击选中的小点点
        select(index);
        carousel(obj.boxWid*index);
        // 延时一秒后开启自动轮播
        let outTime = setTimeout(function(){
          isDestination = true;
          timing();
          clearInterval(outTime);
        },1000);
      }
    }
  }
  
  if (obj.btnTop && obj.btnBottom){
    obj.btnTop.onclick = function (){
      if (isTime){
        isTime = false;
        // 轮播到最后一张 回到起点继续轮播
        if (index == 0){
          index = boxImg.length-1;
          left = obj.boxWid*index;
        }
        index--;
        // 小点点渲染
        if (index == boxImg.length-1){
          select(0);
        } else {
          select(index);
        }
        carousel(obj.boxWid*index);
      }
    }
    obj.btnBottom.onclick = function (){
      if (isTime){
        isTime = false;
        // 轮播到最后一张 回到起点继续轮播
        if (index == boxImg.length-1){
          left = 0;
          index = 0;
        }
        index++;
        // 小点点渲染
        if (index == boxImg.length-1){
          select(0);
        } else {
          select(index);
        }
        carousel(obj.boxWid*index);
      }
    }
  }
});
pictureRutate({
    // 父盒子DOM节点（必填）
    box       : document.querySelector(".picture-rutate"),
    // 两个按钮    （可选）DOM节点
    btnTop    : document.querySelector(".btnTop"),
    btnBottom : document.querySelector(".btnBottom"),
    // 盒子的宽度  （可选）类型Number
    // boxWid    : false,
    // 盒子的偏移量 （可选）类型Number
    // offset    : false);
  })


  