$(function(){
  // 登录功能
  // (1) 点击登录按钮, 获取输入框的 用户名 和 密码
  // (2) 发送 ajax 登录 请求
  // (3) 处理响应
  $("#loginBtn").click(function(){
    var username=$("#username").val();
    var password=$("#password").val();
    console.log(username,password);
    
    //非空校验
    if ( username === "" ) {
      mui.toast("请输入用户名");
      return;
    }
    if ( password === "" ) {
      mui.toast("请输入密码");
      return;
    }
  // 发送ajax登录请求
    $.ajax({
      type:"post",
      url:"/user/login",
      data:{
        username:username,
        password:password
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.error===403){
          mui.toast("用户名或密码错误");
          return;
        }
        if(info.success){
          // 登录成功
          // (1) 是从购物车等页面跳转过来的, 需要跳回去
          // (2) 如果直接访问 login.html, 跳转到个人中心
          if(location.href.indexOf("retUrl")!=-1){
            
            // location.href: 设置或返回完整的 URL。
            // location.search: 设置或返回从问号 (?) 开始的 URL（查询部分）
            var retUrl=location.search.replace("?retUrl=","")
            location.href=retUrl;
          }
          else{
            // 如果直接访问 login.html, 跳转到个人中心
            location.href="user.html";
          }
          
        }
      }
    })
  })
})