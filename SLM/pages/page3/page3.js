// pages/page3/page3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      school :JSON.parse(wx.getStorageSync("Record"))
    })
   
    console.log(JSON.parse(wx.getStorageSync("Record")) )
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
  viewBtn :function(e){
    wx.navigateTo({
    url:'../page4/page4?key1='+JSON.stringify(e.currentTarget.dataset.item)
    })
    console.log(e.currentTarget.dataset.item)
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