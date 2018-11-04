$(function(){

  //假设设置location
  // var arr=["1","2","3","4"];
  // var str=JSON.stringify(arr);
  // localStorage.setItem("search_list",str);
  
  render();//一进入变渲染
  //设置，获取
  // 读取本地存储, 返回一个数组
  function getHistory(){
    var jsonStr=localStorage.getItem("search_list")||"[]";
    var arr=JSON.parse(jsonStr);
    console.log(arr);
    return arr;

  }
   // 将渲染的操作封装
   function render(){
     var arr=getHistory();
     var htmlStr=template("search_tmp",{list:arr});
     $(".lt_history").html(htmlStr);
   }
  
   //清空按钮
   $(".lt_history").on("click",".btn-empty",function(){
     //显示模态框
    mui.confirm("你确定要清空历史记录吗？","温馨提示",["取消","确定"],function(e){
        if(e.index==1){
          //清空历史记录全部
          //  $(".lt_history").remove();
          localStorage.removeItem("search_list");
          render();
        }
    })
   });

   //点击删除单行
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
   $(".lt_history").on("click",".btn-delete",function(){
     var index=$(this).data("index");
      var arr=getHistory();
      // 根据下标删除数组的对应项
    // splice 会改变原数组
    // arr.splice( 从哪开始, 删除几个, 加入的项1, 加入的项2, 加入项3, ..... );
      arr.splice(index,1);
      localStorage.setItem("search_list",JSON.stringify(arr));
      render();
   })

     /*
  * 功能4: 添加历史记录功能
  * 思路:
  *   (1) 给搜索按钮添加点击事件
  *   (2) 获取输入框的值
  *   (3) 往数组的最前面添加 (unshift)
  *   (4) 将数组存储到本地存储中
  *   (5) 页面重新渲染
  * */
 $(".search_btn").click(function(){
   //获得关键字
    var key=$(".search_input").val().trim();
    // 往数组最前面追加
    var arr=getHistory();
    var index=arr.indexOf(key);
    console.log(index);//查看key是否和原数组重复，获取下标
    // index！=-1说明有重复 删除重复项并在最前面插入key值
    
    if(index!=-1){
      arr.splice(index,1);
    }
    if(arr.length>=10){
      arr.pop();//删除最后一个
    }
    arr.unshift(key);
    localStorage.setItem("search_list",JSON.stringify(arr));
    render();
    //重置搜索框
    
    $(".search_input").val("");
    // 跳转到商品列表页面
    location.href="./searchList.html?key="+key;
 })
})