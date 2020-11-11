// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     showLog: false,
     showDiaLog: false,
     school: "广东科技学院-松山湖校区",
     baseData: [
       {
         name: '广东科技学院-松山湖校区',
         id: 1
       },
       {
        name: '广东科技学院-南城校区',
        id: 2
        },
     ],
     tagJson: [
        {
          title: '饭堂',
          list: [
            {name:'一饭',id: 1},
            {name:'二饭',id: 2},
            {name:'广科南城校区',id: 3},
          ]
        },
        {
          title: '种类',
          list: [
            {name:'面食',id: 1},
            {name:'扒饭',id: 2},
            {name:'汉堡薯条',id: 3},
            {name:'甜品',id: 3},
            {name:'香锅麻辣烫',id: 3},
            {name:'快餐',id: 3},
            {name:'快餐1',id: 3},
            {name:'快餐2',id: 3},
            {name:'快餐3',id: 3},
            {name:'快餐4',id: 3},
          ]
        },
        {
          title: '热量',
          list: [
            {name:'低热量',id: 1},
            {name:'高热量',id: 2},
          ]
        }
     ],
     selectItems: [],
     baseData2: [6,2,1,2,5,6,7,8]
  },
  bindClick: function() {
    this.setData({
      showLog: !this.data.showLog
    })
  },
  changeSchool: function(event) {
      // console.log(event.currentTarget.dataset.school)
      this.setData({
        school: event.currentTarget.dataset.school,
        showLog: false
      })
  },
  taptag: function(event) {
    console.log(event.currentTarget.dataset)
    const {boxIndex, name} = event.currentTarget.dataset
    const {selectItems} = this.data
    selectItems[boxIndex] = name
    console.log(selectItems)
    this.setData({
        selectItems
    })
  },
  changeDiaLog: function() {
    this.setData({
      showDiaLog: !this.data.showDiaLog
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      for(let i = 0; i < this.data.baseData2.length; i++) {
        console.log(this.data.baseData2[i])
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