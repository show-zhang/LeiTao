$(function(){

  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    dataType:"json",
    success:function(info){
        console.log(info);
        var htmlStr=template("left_tmp",info);
        $(".lt_category_left ul").html(htmlStr);
        //一进入页面。先渲染第一个id
        render(info.rows[0].id)
    }
  });

  //点击一级分类中的a,对应渲染二级分类
  $(".lt_category_left ul").on("click","a",function(){
    var id=$(this).data("id");
    // console.log(id);
    // 添加选中current属性
    $(this).addClass("current").parent().siblings().find("a").removeClass("current");
    render(id);

  });

    //渲染二级分类
    function render(id){
      $.ajax({
        type:"get",
        url:"/category/querySecondCategory",
        data:{
          id:id
        },
        dataType:"json",
        success:function(info){
          console.log(info);
          var htmlStr=template("right_tmp",info);
          $(".lt_category_right ul").html(htmlStr);
        }
      })
    }
})