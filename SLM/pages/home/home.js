// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList:[],
    forumList:[],
    config:{
      "showForumModel": 0,
      "showHomeForum": 0,
      "showHomeMenu": 0
    },
  },

  loading: true,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  toSearch() {
    wx.navigateTo({
      url: `/pages/search/searchMenu?from=home`,
    })
  },
  getMenu() {
    wx.$fetch({url:'/menu/homeMenu',loading:this.loading}).then(res => {
      console.log(res)
      this.loading = false
      this.setData({menuList:res})
    })
  },

  getForum() {
    wx.$fetch({url:'/forum/homeForum'})
    .then(res => {
      this.setData({forumList:res})
    })
  },
  toAllMenu() {
    wx.navigateTo({
      url: '/pages/allMenu/allMenu',
    })
  },

  jumpToForum(e) {
    wx.$storage.setStorage('forumItem', JSON.stringify(e.currentTarget.dataset.item))
    wx.navigateTo({
      url: "/pages/forum/forumItem/forumItem",
    })
  },

  jump(e) {
    wx.$storage.setStorage('HomeMenuItem', JSON.stringify(e.currentTarget.dataset.menu))
    wx.navigateTo({
      url: '/pages/mark/mark',
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
    this.getConfig()
  },

  getConfig() {
    wx.$fetch({url:"/config/getConfig",loading:false})
        .then(res => {
            if (res !== null) {
              if (!!res.showHomeForum) {
                this.getForum()
              } 
              if (!!res.showHomeMenu) {
                this.getMenu()
              }
              this.setData({config: res})
            }
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