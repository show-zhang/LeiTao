$(function(){
  $.ajax({
    type:"get",
    url:"/user/queryUser",
    data:{
      page:1,
      pageSize:5
    },
    dataType:"json",
    success:function(info){
        console.log(info);
        // 通过模板引擎渲染
      // var htmlStr = template( "模板id", "数据对象")
      // 在模板中可以使用传入的数据对象的属性
        var htmStr=template("tmp",info);
        $("tbody").html(htmStr);
    }

  })
})