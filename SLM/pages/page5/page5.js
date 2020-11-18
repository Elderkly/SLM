// pages/page5/page5.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      menu: [],
      selectJson: []
  },
  TimeId:-1,

  bindKeyInput:function(e){
     if (!!e.detail.value) {
        // console.log(this.data.menu,e.detail.value);
        const newJson = []
        this.data.menu.map(x => {
          if (x.foodName.indexOf(e.detail.value) !== -1) {
            newJson.push(x)
          }
        })
        this.setData({
          selectJson: newJson
        })
        console.log(newJson)
     } else {
       this.setData({
         selectJson: []
       })
     }
  },
  
  tap:function(e) {
    
    console.log(this.data.selectJson[e.currentTarget.dataset.index])
    //  1.将当前点击的数据 写入到上一个页面中  https://blog.csdn.net/weixin_42569598/article/details/103733755
    wx.navigateTo({
      url: '../page4/page4?key1='+JSON.stringify(this.data.selectJson[e.currentTarget.dataset.index])
    })
    //  2.写入成功后 关闭当前页面
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const storage = wx.$storage.getStorage("Menu")
    this.setData({
      menu: storage
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