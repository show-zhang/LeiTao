$(function(){

   // 需求: 解析地址栏参数, 获取搜索关键字key,
  //       设置给 input框, 并且根据关键字发送请求, 进行渲染
  
  function getkey(k){
    var str=location.search;
  
    //解码
    str=decodeURI(str);//?key=鹏&age=18&desc=帅
    str=str.slice(1);//key=鹏&age=18&desc=帅
    // console.log(str);
    
    var arr=str.split("&");
    var obj={};
    arr.forEach(function(v,i){
      var key=v.split("=")[0];
      var value=v.split("=")[1];
      // console.log(key,value);
      obj[key]=value; 
     })
     console.log(obj);
     return obj[k];
   }

   var key=getkey("key");
   console.log(key);
   $(".search_input").val(key);
   
})