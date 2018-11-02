$(function(){
  var currentPage=1;
  var pageSize=5;

  render();//进入时先渲染一遍
  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr=template("secondTmp",info);
        $("tbody").html(htmlStr);
        //分页渲染
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

  // 点击添加按钮弹出模态框
  $("#addBtn").click(function(){
    $("#addModal").modal("show");
    // 请求模态框的下拉菜单数据, 进行渲染
    // /category/queryTopCategoryPaging
    // 提供的是分页接口, 我们可以通过 分页接口, 模拟获取全部一级分类的接口
    // 配置请求 第一页, 请求 100 条数据, 模拟接口
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr=template("dropdownTmp",info);
          $(".dropdown-menu").html(htmlStr);
        
      }
    })
  })
  // 3. 给下拉菜单中的 a 注册点击事件, 通过事件委托注册
  $(".dropdown-menu").on("click","a",function(){
      // 获取 a 的文本
      var txt=$(this).text();
      $("#dropdownText").text(txt);
      // 设置给 隐藏域
      var id=$(this).data("id");
      $('[name="categoryId"]').val(id);

      //手动更改校验状态
      // 让一级分类对应的隐藏域, 校验状态置成 校验成功
    // 参数1: 字段名称
    // 参数2: 校验状态
    // 参数3: 配置校验规则, 用来显示错误信息
    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
  });

  // 4. 配置文件上传插件
  $("#fileupload").fileupload({
     // 返回回来的数据格式 json 格式
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址

    // 文件上传完成回来的 回调函数
    done:function (e, data) {
      // console.log( data.result );  // 后台返回的数据
      console.log(data);

      var picUrl=data.result.picAddr;
      // 设置给 img的 src 属性
      $("#imgBox img").attr("src",picUrl);
       // 设置给 隐藏域
       $('[name="brandLogo"]').val(picUrl);

       // 让 隐藏域 校验状态变成 校验成功
       $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
    }
  });

   // 5. 表单校验
   $("#form").bootstrapValidator({
    excluded:[],
      // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入二级分类"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请选择图片"
          }
        }
      }

    }

   });

   // 6. 注册表单校验成功事件, 阻止默认的表单提交, 通过 ajax 进行提交
   $("#form").on("success.form.bv",function(e){
     e.preventDefault();
     $.ajax({
       type:"post",
       url:"/category/addSecondCategory",
       data:$("#form").serialize(),
       dataType:"json",
       success:function(info){
          console.log(info);
          if(info.success){

            $("#addModal").modal("hide");
            currentPage=1;
            render();
  
            //重置表单
            $("#form").data("bootstrapValidator").resetForm(true);
            $("#dropdownText").text("请输入一级分类");
            $("#imgBox img").attr("src","./images/none.png");
          }
       }
     })
   })
})