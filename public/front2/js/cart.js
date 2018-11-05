/**
 * Created by 54721 on 2018/11/5.
 */

$(function() {

  // 发送请求, 获取购物车列表数据, 进行渲染(要求需要登录的)
  // (1) 未登录, 后台返回 error, 要求用户先登录
  // (2) 已登录, 返回购物车的数据
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/cart/queryCart",
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.error === 400 ) {
          // 跳转到登录页
          location.href = "login.html";
          return;
        }

        // 已经登录成功, 可以渲染购物车
        var htmlStr = template("cartTpl", { list: info });
        $('#cartList').html( htmlStr )
      }
    })
  }



  // 删除功能
  // (1) 通过事件委托, 给所有的删除按钮, 添加点击事件
  // (2) 在删除按钮中存储 当前购物车的 id
  // (3) 获取 id, 发送删除请求
  // (4) 页面重新渲染
  $("#cartList").on("click", ".btn_delete", function() {

    // 获取购物车的 id
    var id = $(this).data("id");

    // 发送 ajax 请求, 进行删除操作
    $.ajax({
      type: "get",
      url: "/cart/deleteCart",
      data: {
        id: [ id ]
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );

        // 页面重新渲染
        render();
      }
    })


  })


})
