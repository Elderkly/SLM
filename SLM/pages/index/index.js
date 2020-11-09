// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     showLog: false,
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