// pages/admin/settingMenu/settingMenu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  jump(e) {
    wx.setStorageSync('settingSchoolItem', JSON.stringify(e.currentTarget.dataset.items))
    wx.navigateTo({
      url: '/pages/schoolItem/schoolItem',
    })
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
    setTimeout(() => {
      const self = this
      wx.$fetch({url:'/school/allSchool',loading:false}).then(res => {
        console.log(res)
        self.setData({list:res})
      })
    },300)
  },

  add: () => {
    wx.setStorageSync('settingSchoolItem', JSON.stringify({
      img: "https://dss1.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/pic/item/a1ec08fa513d2697445f3b255afbb2fb4316d83d.jpg",
      schoolName: "",
      canteenCount: 0
    }))
    wx.navigateTo({
      url: '/pages/schoolItem/schoolItem',
    })
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
    console.log('Unload')
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