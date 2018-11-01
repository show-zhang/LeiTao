// 调用进度条方法
// 开启进度条
// NProgress.start();
// // 结束进度条
// setTimeout(function(){
//   NProgress.done();
// }, 1000);

// ajax 全局事件
// 需求: (1) 在 ajax 开始发送的时候, 开启进度条,
//       (2) 在 所有的 ajax 请求结束时, 结束进度条

// .ajaxComplete() 这个事件将在每个 ajax 完成时调用  (不管成功还是失败, 都会调用)
// .ajaxSuccess()  在每个 ajax 成功时调用
// .ajaxError()    将在每个 ajax 失败时调用
// .ajaxSend()     在每个 ajax 发送前调用

// .ajaxStart()    在第一个 ajax 开始发送时调用
// .ajaxStop()     在所有的 ajax 请求完成后调用
$(function(){
  $(document).ajaxStart(function(){
    NProgress.start();
  });
  $(document).ajaxStop(function(){
    // 在所有的 ajax 请求完成时调用
  // 模拟网络环境, 添加延迟
  setTimeout(function() {
    NProgress.done();
  }, 500);
  })
});

$(function(){
  // 1. 二级导航的切换
  $(".lt_aside .nav .category").on("click",function(){
    $(this).next().stop().slideToggle();
  })

  //2.左侧菜单切换
  $(".lt_main .lt_topbar .icon_menu").click(function(){

    // 切换侧边栏, hidemenu 表示隐藏侧边栏的状态
    $(".lt_aside").toggleClass("hidemenu");
    $('.lt_main .lt_topbar').toggleClass("hidemenu");
    $(".lt_main").toggleClass("hidemenu");
  })

   // 3. 退出功能的实现
  // 显示退出模态框
  $(".lt_main .lt_topbar .icon_logout").click(function(){
    $("#myModal").modal("show");
  });

   // 退出功能
  // 退出登陆的方式:
  // (1) 用户端(浏览器端), 用户自己清除浏览器缓存  (清空了 cookie),
  //     本质上将会话标识 sessionId 也清除了
  // (2) 前端通过发送ajax退出请求, 让后台销毁当前用户的登录状态
  $('#logoutBtn').click(function(){
    // console.log(1);
    
    $.ajax({
      type:'get',
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function(info){

        console.log(info);
        if(info.success){
          location.href="login.html";
        }
      }
    })
  })
})
