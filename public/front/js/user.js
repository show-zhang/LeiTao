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
})