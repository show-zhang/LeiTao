$(function(){
  var currentPage=1;
  var pageSize=2;
  var picArr=[];//定义图片数组

  render();
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
        // console.log(info);
        var htmlStr=template("productTmp",info);
        $("tbody").html(htmlStr);

        //渲染分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            // console.log(page);
            //渲染当前页
            currentPage=page;
            render();
          }
        })
      }
    })
  };
  // 点击出现添加模态框
  $("#addBtn").click(function(){
    $("#addModal").modal("show");
     // 获取所有的二级分类, 进行渲染下拉菜单
     $.ajax({
       type:"get",
       url:"/category/querySecondCategoryPaging",
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

  //下拉列表注册点击事件
  // 给下拉菜单的 a 绑定点击事件 (事件委托绑定)
  $(".dropdown-menu").on("click","a",function(){
      var txt=$(this).text();
      $("#dropdownText").text(txt);

      var id=$(this).data("id");
      $('[name="brandId"]').val(id);

      $("#form").data("bootstrapValidator").updateStatus("brandId","VALID");
  });

  // 4. 进行插件初始化
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      // console.log(data.result);
      var picObj=data.result;
      var picUrl=picObj.picAddr;// 获取图片路径

      // 往数组的最前面追加一个数据
      // picArr 图片数组, 用于存储已上传的图片对象(路径和名称)
      picArr.unshift(picObj);
      // push 在数组的最后面追加
      // pop  在数组的最后面移除
      // unshift 在数组的最前面追加
      // shift 在数组的最前面移除

      // 将图片路径设置给 img src 并添加到 imgBox的子元素最前面
      $("#imgBox").prepend('<img src="'+picUrl+'" alt="">');
      // 当数组长度 > 3 时, 应该删掉最后一个
      // (1) 数组删掉最后一个
      // (2) 图片结构, 去掉最后一个图片
      if(picArr.length>3){
        picArr.pop();
        // 只想找 img, 找最后一个 img 类型的元素
        $("#imgBox img:last-of-type").remove();
      }

      if(picArr.length===3){

        $("#form").data("bootstrapValidator").updateStatus("picStatus","VALID");
      }

      console.log(picArr);
      
    }
 });

 //校验
 $("#form").bootstrapValidator({ 
   excluded:[],
   
  //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields:{
    brandId:{
      validators:{
        notEmpty:{
          message:"请选择二级分类"
        }
      }
    },
    proName:{
      validators:{
        notEmpty:{
          message:"请输入商品名称"
        }
      }
    },
    proDesc:{
      validators:{
        notEmpty:{
          message:"请输入商品描述"
        }
      }
    },
      // 要求库存必须是非零开头的数字
    num:{
      validators:{
        notEmpty:{
          message:"请输入商品库存"
        },
        regexp:{
          regexp:/^[1-9]\d*$/,
          message:"库存格式要求是非零开头的数字"
        }

      }
    },
     // 要求尺码是  xx-xx 的格式,  xx 表示数字
    size:{
      validators:{
        notEmpty:{
          message:"请输入商品尺码"
        },
        regexp:{
          regexp:/^\d{2}-\d{2}$/,
          message:"尺码格式必须是 xx-xx 的格式, 例如: 32-40"
        }
      }
    },
    oldPrice:{
      validators:{
        notEmpty:{
          message:"请输入商品原价"
        },
        regexp:{
          regexp:/^\d+(\.\d+)?$/,
          message:"请输入不为零的数字"
        }
      }
    },
    price:{
      validators:{
        notEmpty:{
          message:"请输入商品现价"
        },
        regexp:{
          regexp:/^\d+(\.\d+)?$/,
          message:"请输入不为零的数字"
        }
      }
    },
    picStatus:{
      validators:{
        notEmpty:{
          message:"请上传3张图片"
        }
      }
    }
  }
 });

// 6. 注册表单校验成功事件, 阻止默认的提交, 通过 ajax 提交
$("#form").on("success.form.bv",function(e){
    e.preventDefault();

    // 拼接需要传给后台的参数
    var param=$("#form").serialize();
    param+="&picAddr1="+picArr[0].picAddr+"&picName1="+picArr[0].picName;
    param+="&picAddr2="+picArr[1].picAddr+"&picName2="+picArr[0].picName;
    param+="&picAddr3="+picArr[2].picAddr+"&picName3="+picArr[2].picName;
    $.ajax({
        type:"post",
        url:"/product/addProduct",
        data:param,
        dataType:"json",
        success:function(info){
          console.log(info);
          if(info.success){
            $("#addModal").modal("hide");
            currentPage=1;
            render();

            //重置
            $("#form").data("bootstrapValidator").resetForm(true);
            $("#dropdownText").text("请选择二级分类");
            $("#imgBox img").remove();
          }
        }
    })
})


})