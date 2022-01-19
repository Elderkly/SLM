// pages/search/searchMenu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectJson: []
  },
  switch:true,
  index:null,
  from:null,

  bindKeyInput:function(e){
    if (!!e.detail.value && this.switch) {
       this.switch = false
       wx.$fetch({url:`/menu/search/${e.detail.value}`})
       .then(res => {
        this.switch = true
         console.log(res)
         this.setData({selectJson:res})
       })
    } else {
      this.setData({
        selectJson: []
      })
    }
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.index = options.index
    this.from = options.from
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  tap: function(e) {
    if (this.from === 'home') {
      wx.$storage.setStorage('HomeMenuItem', JSON.stringify(this.data.selectJson[e.currentTarget.dataset.index]))
      wx.navigateTo({
        url: '/pages/mark/mark',
      })
    } else {
      var pages = getCurrentPages();
      var beforePage = pages[pages.length - 2]; // 前一个页面
      beforePage.changeData(this.index,this.data.selectJson[e.currentTarget.dataset.index]); //调用上个页面的方法
      //  2.写入成功后 关闭当前页面
      wx.navigateBack()
    }
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