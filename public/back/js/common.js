
// 二级导航的切换
$(function(){
   // 1. 二级导航的切换
   $(".lt_aside .nav .category").on("click",function(){
     $(this).next().stop().slideToggle();
   })


   // 3. 退出功能的实现
  // 显示退出模态框
  $(".lt_topbar .icon_logout").click(function(){
     // 显示模态框
    // 显示 modal("show");
    // 隐藏 modal("hide");
    $("#logoutModal").modal("show");
  })
})