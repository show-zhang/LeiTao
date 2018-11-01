$(function(){
    var currentPage=1;// 当前页
    var pageSize=5;// 每页多少条

    // 1. 发送ajax请求数据, 进行渲染
    render();
  function render(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        // console.log(info);
        var htmlStr=template("firstTmp",info);
        $("tbody").html(htmlStr);

        //分页创建
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
    // 添加分类
    $("#addBtn").click(function(){
      $("#addModal").modal("show");
    })

    // 3. 表单校验
    $("#form").bootstrapValidator({

      // 配置需要校验的字段
      fields:{
        categoryName:{
          // 校验规则
          validators:{
            notEmpty:{
              message:"请输入一级分类"
            }
          }
        }
      }
    });

     // 4. 注册表单校验成功事件, 阻止默认的提交, 通过 ajax 提交
     $("#form").on("success.form.bv",function(e){
         // 阻止默认的提交
         e.preventDefault();
         $.ajax({
          type:"post",
          url:"/category/addTopCategory",
          data:$("#form").serialize(),
          dataType:"json",
          success:function(info){
            // console.log(info);
            // 关闭模态框
            $("#addModal").modal("hide");
            currentPage=1;//要出现在最前面，需要重新渲染第一页
            render();

            // 重置表单
             // resetForm(true) 传 true 表示内容和校验状态都重置
            $("#form").data("bootstrapValidator").resetForm(true);

          }
         })
     })
   
})