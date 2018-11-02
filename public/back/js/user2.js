$(function(){
  var currentPage=1;
  var pageSize=5;
  var currentId;//当前修改的用户id
  var isDelete;//修改的状态
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
          // console.log(info);
          // 通过模板引擎渲染
        // var htmlStr = template( "模板id", "数据对象")
        // 在模板中可以使用传入的数据对象的属性
          var htmStr=template("tmp",info);
          $("tbody").html(htmStr);
  
          // 分页插件
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
              // console.log(page);
              currentPage=page;
              render();
              
          }
        })
      }
  
    })
  }

  // 禁用和启用
  $("tbody").on("click",".btn",function(){
    $("#userModal").modal("show");
     // 获取父元素 td 中存储的 data-id
     currentId=$(this).parent().data("id");
    // 获取启用还是禁用, 根据按钮的类来判断
    // 禁用 ? 0 : 1;
     isDelete=$(this).hasClass("isDelete")?0:1;
  });
  // 点击模态框确定按钮, 进行修改用户状态
  $("#submitBtn").click(function(){
    $.ajax({
      type:"post",
      url:"/user/updateUser",
      data:{
        id:currentId,
        isDelete:isDelete
      },
      dataType:"json",
      success:function(info){
          // console.log(info);
          $("#userModal").modal("hide");
          render();
      }
    })
  })
  
})