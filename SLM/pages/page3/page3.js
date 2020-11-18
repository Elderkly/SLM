// pages/page3/page3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school:[]
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
    wx.setStorage({
      data: JSON.stringify(e.currentTarget.dataset.item),
      key: 'page4Items',
    })
    wx.navigateTo({
    url:'../page4/page4'
    })
    },  
  delete(id){
    console.log('page3',id)
    if(!!id) {
      const index = this.data.school.findIndex(e => e.id === id)
      if (index !== -1) {
        console.log(index)
        const {school} = this.data
        school.splice(index, 1)
        this.setData({school})
      }
    }
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