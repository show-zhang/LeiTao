$(function(){
  // 柱状图
  // 基于准备好的dom，初始化echarts实例
  var leftChart = echarts.init(document.querySelector(".content .echarts_left"))
  // 指定图表的配置项和数据
  var option = {
      title: {
          text: '2017年注册人数'
      },
      tooltip: {},
      legend: {
          data:['人数']
      },
      xAxis: {
          data: ["1月","2月","3月","4月","5月","6月"]
      },
      yAxis: {},
      series: [{
          name: '人数',
          type: 'bar',
          data: [150, 820, 736, 1000, 610, 920]
      }]
  };

  // 使用刚指定的配置项和数据显示图表。
  leftChart.setOption(option);

  //右侧饼状图
    // 基于准备好的dom，初始化echarts实例
    var rightChart = echarts.init(document.querySelector(".content .echarts_right"))
    // 指定图表的配置项和数据
    var option = {
      title : {
          text: '热门品牌促销',
          subtext: '2017年6月',
          x:'center',
          textStyle:{
              fontSize:20,
                fontFamily:"宋体"
          }
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          left: 'right',
          data: ['耐克','阿迪','新百伦','阿迪王','李宁']
      },
      series : [
          {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                  {value:335, name:'耐克'},
                  {value:310, name:'阿迪'},
                  {value:234, name:'新百伦'},
                  {value:135, name:'阿迪王'},
                  {value:1548, name:'李宁'}
              ],
              itemStyle: {
                  emphasis: {
                      shadowBlur: 20,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(255, 0, 0, 0.5)'
                  }
              }
          }
      ]
  };
  
    // 使用刚指定的配置项和数据显示图表。
   rightChart.setOption(option);
  


})