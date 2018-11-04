$(function(){
    // 由于进行的是本地存储操作, 约定存储的键名: search_list

  // 以下三句话, 放在控制台执行, 用于添加假数据
   var arr = ["耐克", "阿迪", "阿迪王", "耐克王"];
   var jsonStr = JSON.stringify( arr );
   localStorage.setItem( "search_list", jsonStr );

  /*
  * 功能分析:
  * 功能1: 搜索历史记录渲染
  * 功能2: 清空搜索历史
  * 功能3: 删除单条历史记录
  * 功能4: 添加搜索历史记录
  * */
//  JSON.stringify() : JavaScript 值/数组 转换为 JSON 字符串。
// JSON.parse() : 将JSON 字符串 转换为 JavaScript 对象/数组。

  /*
  * 功能1: 搜索历史记录渲染
  * 思路:
  *   (1) 读取本地存储, 读取得到是 jsonStr
  *   (2) 转成数组
  *   (3) 结合模板引擎渲染
  * */
  render();
  // 读取本地存储, 返回一个数组
  function getHistory(){

    var jsonStr=localStorage.getItem("search_list")||"[]";
    var arr=JSON.parse(jsonStr);
    // console.log(arr);
    return arr;
  }
  // 将渲染的操作封装
  function render(){
    var arr=getHistory();
    var htmlStr=template("search_tmp",{list:arr});
    $(".lt_history").html(htmlStr);

  }
  //清空功能
  $(".lt_history").on("click",".btn-empty",function(){
    //模态框功能，未写  参照mui中的dialog(消息框)
    mui.confirm("你确定要清空历史记录嘛?","温馨提示",["取消","确定"],function(e){
      // console.log(e.index);//点击取消显示0，点击确定显示1
      if(e.index===1){
          localStorage.removeItem("search_list");
          render();
      }
      
    })
  
  });

  //删除单个
  /*
  * 功能3: 删除单个
  * 思路:
  *   (1) 给删除按钮, 通过事件委托注册点击事件
  *   (2) 存储下标, 点击的时候, 获取下标
  *   (3) 根据下标, 删除数组的对应项
  *   (4) 将数组存储到本地存储中
  *   (5) 页面重新渲染
  * */
  $(".lt_history").on("click",".btn_delete",function(){
    // 获取下标
      var index=$(this).data("index");

      // 获取历史记录数组
      var arr=getHistory();
      // 根据下标删除数组的对应项
    // splice 会改变原数组
    // arr.splice( 从哪开始, 删除几个, 加入的项1, 加入的项2, 加入项3, ..... );
      arr.splice(index,1);
      // 转成 jsonStr, 存储到本地
      localStorage.setItem("search_list",JSON.stringify(arr));
      // 重新渲染
      render();
  });

    /*
  * 功能4: 添加历史记录功能
  * 思路:
  *   (1) 给搜索按钮添加点击事件
  *   (2) 获取输入框的值
  *   (3) 往数组的最前面添加 (unshift)
  *   (4) 将数组存储到本地存储中
  *   (5) 页面重新渲染
  * */

  $(".lt_search").on("click",".search_btn",function(){
     // 获取关键字
      var key=$(".search_input").val().trim();
       // 往数组最前面追加
       if(key==""){
          mui.toast("请输入搜索关键字");
       }
       // 需求:
        // 1. 如果发现在追加前, 有重复的项, 删除重复的项
        // 2. 长度在 10 个以内

      // 往数组最前面追加
      // 获取历史记录数组
      var arr=getHistory();
      //先判断是否有重复项
      var index=arr.indexOf(key);
      console.log(index);
      //index!==-1说明存在重复项
      if(index!==-1){
        arr.splice(index,1);
      }
      if(arr.length>=10){
        arr.pop();
      }
      
      arr.unshift(key);
      // console.log(arr);

       // 转成 jsonStr, 存储到本地
      localStorage.setItem("search_list",JSON.stringify(arr));
      render();
      //重置搜索框
      $(".search_input").val("");
      //跳转到搜索页面  语法：location.href=URL
      location.href="./searchList.html";
      
  })


  

 
})