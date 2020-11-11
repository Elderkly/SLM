// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     // 显示学校选择框
     showLog: false,
     // 显示大筛选框
     showDiaLog: false,
     // 当前选择学校
     school: "广东科技学院-松山湖校区",
     // 学校数据
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
     // 筛选数据
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
     // 筛选选中数据
     selectItems: [],
     // 菜品数据
     MenuJson: [],
     // 筛选index
     selectIndex: -1,
     showImg: null
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
      const menu = wx.$storage.getStorage("Menu")
      // console.log(menu[0].img)
      if (!!menu) {
         this.setData({
            menu,
            showImg: menu[0].img
         })
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