// 设置区域滚动
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false, //是否显示滚动条
});

//设置轮播图自动播放
//获得slider插件对象
// var gallery = mui('.mui-slider');
// gallery.slider({
//   interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
// });

// 复用的解析地址栏参数的方法
function getSearch(k){
  // 获取地址栏参数
// 属性search	设置或返回从问号 (?) 开始的 URL（查询部分）。
var str=location.search;//?key=%E9%B9%8F&age=18&desc=%E5%B8%85
// var str="?key=%E9%B9%8F&age=18&desc=%E5%B8%85";
 // 转码成中文
 str=decodeURI(str);
  // slice(start, end);
  // 从start开始, 截取到end结束, 包含start, 不包含end
  // 如果不传 end, 表示截取到最后
  // 去掉 ?
  str=str.slice(1);// "key=鹏&age=18&desc=帅"
  
  var arr=str.split("&"); // ["key=鹏", "age=18", "desc=帅"]

  var obj={};
  arr.forEach(function(v,i){
    var key=v.split("=")[0];
    var value=v.split("=")[1];
     // 中括号 和 . 语法的区别在于, 中括号可以解析里面的变量
     obj[key]=value; 
    
  });
  return obj[k];
}