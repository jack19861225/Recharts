HTMLWidgets.widget({

  name: 'Bar',

  type: 'output',

  initialize: function(el, width, height) {
    document.getElementById(el.id).width = width;
    document.getElementById(el.id).height = height;
    var myChart = echarts.init(document.getElementById(el.id)); 
    return {
      chart: myChart
    }

  },

  renderValue: function(el, x, instance) {
    var text = x.title;
    var avg = x.avg;
    var extremum = x.extremum;
    var hori = x.horizontal;
    var smooth = x.smooth;
    var subtext = x.subtitle; 
    var type = x.type;
    var category = x.category;
    var data = x.data;
    var legend = Object.keys(data);
    var series = [];
    for (var i = legend.length - 1; i >= 0; i--) {
    	var object = {
    		"name":legend[i],
    		"type":type,
    		"data":data[legend[i]],
        "smooth":smooth
      }
      
      if(extremum){
        object["markPoint"]= {
          "data" : [
                    {"type" : 'max', "name": '最大值'},
                    {"type" : 'min', "name": '最小值'}
                ]
            } 
      }
      
      if(avg){
        object["markLine"]= {
            "data" : [
                {"type" : 'average', "name": '平均值'}
            ]
        }
      }
      
    	series.push(object);
    };
    var interval = x.interval;
    
    var option = {
        title:{
          text:text,
          subtext:subtext
        },
        
        toolbox: {
          show : true,
          feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
        },
        
        calculable : true,
        
        tooltip: {
            show: true
        },
        
        legend: {
            data:legend,
            y: 'bottom'
        },
        series : series
    };

    if(!hori){
       option["xAxis"]=[
            {
                type : 'category',
                data : category,
                axisLabel : {interval:interval}

            }
        ];
        option["yAxis"] = [
            {
                type : 'value'
            }
        ];
    }else{
      option["xAxis"] = [
            {
                type : 'value'
            }
        ];
      option["yAxis"] = [
            {
                type : 'category',
                data : category,
                axisLabel : {interval:interval}
            }
        ];
        

    }

    // 为echarts对象加载数据 
    instance.chart.setOption(option); 

},

  resize: function(el, width, height, instance) {
    document.getElementById(el.id).width = width;
    document.getElementById(el.id).height = height;
    instance.chart.resize();
  }

});
