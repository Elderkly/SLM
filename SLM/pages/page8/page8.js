// pages/page8/page8.js
import {formatData} from '../../common/Utils'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseData: [
      {
        name: '广科-松山湖校区',
        ftNum:2,
        foodNum:80,
        time:"2020-11-07",
        id: 1
      },
      {
        name: '广科-南城校区',
        ftNum:3,
        foodNum:70,
        time:"2020-11-07",
        id: 2
      },{
        name: '广科-松山湖校区',
        ftNum:2,
        foodNum:80,
        time:"2020-11-07",
        id: 3
      },{
        name: '广科-松山湖校区',
        ftNum:2,
        foodNum:80,
        time:"2020-11-07",
        id: 4
      },
      {
        name: '广科-松山湖校区',
        ftNum:2,
        foodNum:80,
        time:"2020-11-07",
        id: 4
      },
      {
        name: '广科-松山湖校区',
        ftNum:2,
        foodNum:80,
        time:"2020-11-07",
        id: 4
      },
      {
        name: '广科-松山湖校区',
        ftNum:2,
        foodNum:80,
        time:"2020-11-07",
        id: 4
      },
      {
        name: '广科-松山湖校区',
        ftNum:2,
        foodNum:80,
        time:"2020-11-07",
        id: 4
      },
    ],
    json: [],
    addIndex: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  从缓存池内取出学校、食堂、菜品缓存 
     const [school,menu,canTeen] = [
        wx.$storage.getStorage("SchoolJson"),
        wx.$storage.getStorage("Menu"),
        wx.$storage.getStorage("CanTeen"),
     ]
     // 将取出的缓存进行二次重组
     this.regroup(school,canTeen,menu)
  },

  /**
   * 重组缓存数据
  */
  regroup(school, canteen, menu) {
    //  newJson函数最终重组完毕后的数组
    const newJson = school
    //  统计每个学校对应有几个饭堂
    canteen.map(e => {
      //  根据饭堂绑定的学校ID 查找这个学校ID在newJson中的下标 如果找到了返回下标 没有就返回-1
       const schoolIndex = newJson.findIndex(x => x.schoolID === e.schoolID)
       // 找到了对应的学校 将这个学校的饭堂数量+1
       if (schoolIndex !== -1) newJson[schoolIndex].canteenNums = newJson[schoolIndex].canteenNums ? newJson[schoolIndex].canteenNums + 1 : 1
    })
    //  统计每个学校的菜品数量
    menu.map(e => {
      const schoolIndex = newJson.findIndex(x => x.schoolID === e.schoolID)
       if (schoolIndex !== -1) newJson[schoolIndex].menuNums = newJson[schoolIndex].menuNums ? newJson[schoolIndex].menuNums + 1 : 1
    })
    //  重新写入json数据 刷新页面
    this.setData({
      json: newJson
    })
  },
  //  添加学校
  addSchool() {
    //  现数组
     const {json} = this.data
     // 在原有基础上 插入一条空数据
     json.push({
        canteenNums: 0,
        id: json.length + 1,      //  ID为顺延的 所以可以直接+1
        menuNums: 0,
        schoolID: `sc00${json.length + 1}`, //同上
        schoolName: "",
        time: formatData(new Date().getTime()),   //  将当前获取的时间戳进行转义
     })
     // 刷新页面
     // addIndex：指向最后一条数据 只有他的名字可以编辑
     this.setData({json,addIndex: json.length})
  },
  //  输入框失去焦点
  bindblur(event) {
    //  当前输入框的内容
    const text = event.detail.value
    //  如果没有输入内容 删除刚刚插入的空数据
    if (!text) {
      const {json} = this.data
      json.pop()
      this.setData({json})
    }
  },
  //  输入框回车事件
  bindconfirm(event) {
    //  输入内容
     const text = event.detail.value
     // 原数据
     const {json} = this.data
     // 有内容
     if (!!text) {
        //  写入输入内容 主动禁用输入框
        json[event.currentTarget.dataset.index].schoolName = text
        this.setData({
          json,
          addIndex: -1
        })
        wx.showToast({
          title: '添加成功'
        })
        //  写入缓存
        wx.$storage.setStorage("SchoolJson",JSON.stringify(json))
     } else {
        //  没有输入内容 删除最后一条空数据
        wx.showToast({
          title: '请输入内容',
          icon:'none'
        })
        json.pop()
        this.setData({json})
     }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})