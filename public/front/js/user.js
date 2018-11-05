$(function(){
  $.ajax({
    type:"get",
    url:"/user/queryUserMessage",
    dataType:"json",
    success:function(info){
      console.log(info);
      if(info.error==400){
        //未登录
        location.href="login.html";
      }
      var htmlStr=template("user_tmp",info);
      $("#userInfo").html(htmlStr);
    }
  })

  //退出登录功能
  $("#logout").click(function(){
    console.log("退出登录");
    
    $.ajax({
        type:"get",
        url:"/user/logout",
        dataType:"json",
        success:function(info){
          console.log(info);
           if(info.success){
             // 退出成功, 跳转到登录页
             location.href="login.html";
           }
        }
    })

  })
})