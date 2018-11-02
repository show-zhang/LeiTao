$(function(){
  
  var currentPage=1;
  var pageSize=2;

  render();
  // 1. 发送请求, 动态渲染页面
  function render(){
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr=template("productTmp",info);
        $("tbody").html(htmlStr);
  
        // 引入分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
              console.log(page);
              currentPage=page;
              render();
          }
  
        })
      }
    })
  };

  // 点击出现模态框
  $("#addBtn").click(function(){
    $("#addModal").modal("show");
  })
 

  
})