$(function(){

   // 需求: 解析地址栏参数, 获取搜索关键字key,
  //       设置给 input框, 并且根据关键字发送请求, 进行渲染
  
   var key=getSearch("key");
 
    // 设置给 input
   $(".search_input").val(key);
   
   render();

   function render(){
      // 1. 根据关键字发送请求, 进行渲染
      // 添加加载动画
      $(".lt_product").html('<div class="loading"></div>');


      // 三个必传的参数 
        var obj={};
        obj.proName=$(".search_input").val();
        obj.page=1;
        obj.pageSize=100;
     
    // 两个可选的参数, 价格price 库存num
    // (1) 根据有没有高亮的 a, 决定是否需要排序
    // (2) 根据箭头的方向(类名), 决定降序还是升序,  2降序, 1升序
        var $current=$(".lt_sort a.current");
        if($current.length>0){
         // 有高亮的 a, 需要排序
         var sortName=$current.data("type");
         var sortValue=$current.find("i").hasClass("fa-angle-down") ?2:1;
         obj[sortName]=sortValue;
        }

     setTimeout(function(){
      $.ajax({
        type:"get",
        url:"/product/queryProduct",
         // 三个必传的参数
        data:obj,
        dataType:"json",
        success:function(info){
           console.log(info);
           var htmlStr=template("list_tmp",info);
           $(".lt_product").html(htmlStr);
        }
   
      });
     },2000)
   }
   //点击搜索按钮，进行搜索
   $(".search_btn").click(function(){
     render();
   })

   // 3. 排序功能
  // (1) 给有 data-type 属性的排序按钮 注册点击事件
  // (2) 原来没有 current 类, 添加上 current 类
  // (3) 如果原来有 current 类, 改变箭头方向
  // (4) 根据 高亮的 a, 和箭头方向, 进行排序
  $(".lt_sort a[data-type]").click(function(){
      if($(this).hasClass("current")){
        // 有current 类, 改变箭头方向  fa-angle-down => fa-angle-up
        $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
      }
      else{
        // 没有current 类, 添加current类, 添加的同时要排他
        $(this).addClass("current").siblings().removeClass("current"); 
      }
       // 根据 高亮的 a, 和箭头方向, 进行排序
       render();
  })

})