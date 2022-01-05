// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'id',
    imgesrc:'https://dss1.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/pic/item/a1ec08fa513d2697445f3b255afbb2fb4316d83d.jpg',
    islogin:false
  },
  updateBtn: function(){
         wx.navigateTo({
           url:'../page3/page3.wxss'
         })
      },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo()
  },

  login() {
    this.getInfo()
  },

  bindgetuserinfo(res) {
    console.log(res)
  },
  async getInfo() {
    const id = await wx.$utils.getUserID()
    console.log('getUserID',id)
    this.setData({
      islogin: !!id
    })
  },
  jump(e) {
    console.log(e.currentTarget.dataset.url)
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
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