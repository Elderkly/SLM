import * as echarts from '../../ec-canvas/echarts';
import {formatData} from '../../common/Utils'
const app = getApp();
let list = []

async function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  const storage = list
  const dateArr = []
  const valueArr = []
  const newArr = []
  storage.map((e,index) => {
    const time = formatData(e.recordTime)
    e.time = parseInt(e.recordTime)
    const xindex = newArr.findIndex(x => x.time === time)
    if (xindex === -1) {
      newArr.push({
        time: time,
        calorie: e.calorie
      })
    } else {
      newArr[xindex].calorie += e.calorie
    }
  })
  newArr.map(e => {
    dateArr.unshift(e.time)
    valueArr.unshift(e.calorie)
  })
  // console.log(newArr,dateArr,valueArr)

  var option = {
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    // legend: {
    //   data: ['A', 'B', 'C'],
    //   top: 50,
    //   left: 'center',
    //   backgroundColor: 'red',
    //   z: 100
    // },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dateArr,
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      // splitLine: {
      //   lineStyle: {
      //     type: 'dashed'
      //   }
      // }
      // show: false
    },
    series: [{
      name: '卡路里',
      type: 'line',
      smooth: true,
      data: valueArr
    }]
  };

  chart.setOption(option);
  return chart;
}
function initChart2(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  const storage = list
  const newJson = []
  storage.map(e => {
    const index = newJson.findIndex(x => x.name === e.menuName)
    if (index !== -1) {
      newJson[index].value += 1
    } else {
      newJson.push({
        name: e.menuName,
        value: 1
      })
    }
  })
  console.log(newJson)
  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          fontSize:9
        }
      },
      type: 'pie',
      // center: ['50%', '50%'],
      radius: '60%',
      // radius: ['65%', '35%'],
      data: newJson,
      itemStyle: {
        emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        normal:{ 
            label:{ 
                show: true, 
                // position: 'inside',//数据在中间显示
                formatter: '{b}: {d}%' ,
            }, 
            labelLine :{show:true} 
        } 
    }
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    },
    ec2: {
      onInit: initChart2
    },
    showChat: 'loading'
  },

  onLoad() {
    // const storage = wx.$storage.getStorage("Record")
    // console.log(storage && storage.length > 0)
    // this.setData({
    //   showChat: !!storage
    // })
    setTimeout(() => this.initData(),300)
  },

  async initData() {
    const data = await this.getData()
    console.log(data)
    list = data
    this.setData({
      showChat: data.length > 0
    })
  },


  async getData() {
    const UserInfo = wx.$storage.getStorage('UserInfo')
    console.log('getUserID（）获取用户信息',UserInfo)
    if (!!UserInfo && !!UserInfo.id) {
        const res = await wx.$fetch({url:`/randomRecord/getUserRandomRecord/${UserInfo.id}`})
        console.log('用户数据',res)
        return res
    }
    return []
  },
});
