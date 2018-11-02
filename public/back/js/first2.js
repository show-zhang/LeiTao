$(function(){

  var currentPage=1;
  var pageSize=5;
  render();
  //从后台获取数据并渲染
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
          var htmlStr=template("tmp",info);
          $("tbody").html(htmlStr);

          //设置分页
          $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
            currentPage:info.page,//当前页
            totalPages:Math.ceil(info.total/info.size),//总页数
           
            onPageClicked:function(a,b,c,page){
              //为按钮绑定点击事件 page:当前点击的按钮值
              console.log(page);
              currentPage=page;
              render();
            }
          });
          
      }
    })
  }

  // 点击出现模态框
  $("#addBtn").click(function(){   
    $("#addModal").modal("show");
  });

  // 校验
  $("#form").bootstrapValidator({
     //2. 指定校验时的图标显示，默认是bootstrap风格
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields:{
        categoryName:{
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
    
    e.preventDefault();
    $.ajax({
     type:"post",
     url:"/category/addTopCategory",
     data:$("#form").serialize(),
     dataType:"json",
      success:function(info){
        console.log(1);
        
        console.log(info);
        if(info.success){
          $("#addModal").modal("hide");
          currentPage=1;
          render();

          // 重置状态
          $("#form").data("bootstrapValidator").resetForm(true);
        }
      }

    })
  })

})