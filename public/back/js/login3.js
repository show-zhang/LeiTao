$(function(){

  $("#form").bootstrapValidator({
    //指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空"
          },
          stringLength:{
            min:2,
            max:6,
            message:"用户名长度必须为2-6位"
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },

      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码的长度必须是6-12位"

          },
          callback:{
            message:"密码错误"
          }
        }
      }


    }
  });
   

  // 注册表单验证成功事件
  //使用ajax
  $("#form").on("success.form.bv",function(e){
      e.preventDefault();//阻止默认事件
      $.ajax({
        type:"post",
        url:"/employee/employeeLogin",
        data:$("#form").serialize(),
        dataType:"json",
        success:function(info){
          console.log(info);
          if(info.success){
            location.href="index.html";
          }
              
          if(info.error===1000){
            // console.log("用户名不存在");
            // 调用插件实例方法, 更新校验状态成失败
              // updateStatus
              // 参数1: 校验字段
              // NOT_VALIDATED, VALIDATING, INVALID or VALID
              // 参数2: 校验状态  NOT_VALIDATED未校验, VALIDATING校验中, INVALID校验失败 or VALID成功
              // 参数3: 配置校验规则, 用于配置提示信息
            
            $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
          }
          if(info.error===1001){
            $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
          }
        }
      })
  });

  // 重置
  $("button[type='reset']").on("click",function(){
    // 调用实例的方法, 重置校验状态和内容
    // resetForm 传true, 内容和校验状态都重置
    //           不传true, 只重置校验状态
    $("#form").data("bootstrapValidator").resetForm(true);
  })



})