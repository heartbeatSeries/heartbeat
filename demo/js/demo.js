     //根据body宽来设置高度
      document.body.style.height = window.innerWidth * 1.625 + "px";
      
      var page = document.querySelectorAll(".page");
      
      var p1 = {
        Music   : document.getElementById("Music"),
        audio   : document.querySelectorAll("audio")[0],
        j       : false,
        p       : page[4].querySelector("p"),
        i       : 0,
        time    : setInterval(function (){
            p1.i++;
            p1.p.innerText = p1.i+"%";
            if (p1.i == 100) {
                clearInterval(p1.time);
                page[4].style.animation = "op 1s forwards";
                p2.op();
            }
        },20)
      }
      //音乐
      p1.Music.onclick = function (){
        if (p1.j) {
          p1.Music.style.animation = "";
          p1.Music.innerText = "/";
          p1.audio.pause();
          p1.j = false;
        } else {
          p1.Music.style.animation = "yb 1s infinite";
          p1.Music.innerText = "♪";
          p1.audio.play();
          p1.j = true;
        }
      };
      
      var p2 = {
        allp    : page[3].querySelectorAll("p"),
        huadong : page[3].querySelector(".huadong"),
        op      : function (){
          //第二个页面显示后改做什么
          for (var i=0; i<this.allp.length; i++) {
            this.allp[i].style.animation = "op2 1s "+i+"s forwards";
          };
          //延时显示上划按钮
          setTimeout(function (){
            p2.huadong.style.opacity = 1;
          },6000);
        }
      };
      
      var p3 = {}
      var p4 = {}
      var p5 = {}
      
      /*
        分析整个任务二
        要求：5个页面写在同一个页面下，手机端。
          1、结构化分析
            - 使用手机视口。
            - 首先它有5个页面。（使用5个div盒子来制作）
            - 每个页面大小位置一致。（使用类，且定位）
          2、css设计
            - 公共样式部分，每个页面大小位置一致，可以使用类来设计。
            - 每个页面里的元素位置，几乎没有相同点，可以单独设置样式、定位。
            - 动画设计好，由js调用添加。
          3、html结构设计
            - 每个页有独立的id给css进行样式设置。
            - 使用绝对定位使5个页面层叠在一起，滑动时上划当前页上划掉，层叠在最上面的页面显示。
            - 第一个页面在最后写，最后一个页面在最前写（如果使用绝对定位的话，就不会因为显示顺序反了，而去重新设置层叠等级了）
          4、js设计
            - 每个页面都使用一个对象或方法，执行完当前的代码才去执行后面的代码。（可选择的方法很多，但我们要选择简单的，才会更快写完）
            - 如果使用对象或方法来做的话，更能具体的表现出页面的结构，页面逻辑更清楚，且容易读懂。
            - js负责添加动画就行了，动画在css里写好。
            
                                                                                  ----如有更好的，请及时指正。
      */