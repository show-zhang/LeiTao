$(function(){
  var productId=getSearch("productId");
  console.log(productId);
  
  // 渲染页面
  $.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{
      id:productId
    },
    dataType:"json",
    success:function(info){
      console.log(info);
      //模板渲染
      var htmlStr=template("product_tmp",info);
      $(".lt_main .mui-scroll").html(htmlStr);

      // 手动图片轮播的初始化方法
      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      
      // 动态添加的Numbox组件需要手动初始化
      mui(".mui-numbox").numbox()


    }

  });
  
  // 3. 给尺码添加可选功能(通过事件委托注册)
  $(".lt_main .mui-scroll").on("click",".lt_size span",function(){
        // 添加类名 current, 注意要排他
    $(this).addClass("current").siblings().removeClass("current");
  })

  //加入购物车
  $("#addCart").click(function(){
       // 获取尺码和数量, 发送请求
      var size=$(".lt_size span.current").text();
      var num=$(".mui-numbox-input").val();
      console.log(size,num);
      
      if(!size){
        //没有选择尺码，进行提示
        mui.toast("请选择尺码");//自动消失提示框
        return;
      }
      $.ajax({
        type:"post",
        url:"/cart/addCart",
        data:{
          productId:productId,
          num:num,
          size:size
        },
        dataType:"json",
        success:function(info){
          console.log(info);
          if(info.error===400){
            // 当前用户未登录, 直接拦截到登陆页, 而且将当前页地址传递过去
            location.href="login.html?retUrl="+location.href;
          }
          if(info.success){
             // 成功, 已登录, 加入成功
          // 弹出提示框, 提示添加成功
          mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){
            // console.log(e.index);
            // 通过 e.index 判断用户点击的是哪个按钮 
            if(e.index===0){
                location.href="cart.html";
              }
          })
          } 
        }
      })
  })
  

})