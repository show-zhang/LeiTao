$(function(){

  // 获取一级分类
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    dataType:"json",
    success:function(info){
      // console.log(info);
      var htmlStr=template("left_tmp",info);
      $(".lt_category_left ul").html(htmlStr);

      //一进入页面。先渲染第一个id
      render(info.rows[0].id);
    }
  });
 

  // 2. 给左侧 a 注册点击事件 (通过事件委托注册)
  $(".lt_category_left ul").on("click","a",function(){
      var id=$(this).data("id");
       //给选择的a设置选择状态
      $(this).addClass("current").parent().siblings().find("a").removeClass("current");
      //渲染二级分类
      render(id);
     
  });
   // 根据一级分类的 id, 渲染二级分类
  function render(id){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      data:{
        id:id
      },
      dataType:"json",
      success:function(info){
        // console.log(info);
        var htmlStr=template("right_tmp",info);
        $(".lt_category_right ul").html(htmlStr);
      }
    })
  }
})