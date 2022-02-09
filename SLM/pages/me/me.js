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
    
  },

  login() {
    this.getInfo()
  },

  bindgetuserinfo(res) {
    console.log('bindgetuserinfo',res)
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
    if (!this.data.islogin) {
      wx.showToast({
        title: '请登录后再进行操作',
        icon:'none'
      })
    } else {
      if (e.currentTarget.dataset.url === '/pages/admin/admin') {
        const UserInfo = wx.$storage.getStorage('UserInfo')
        console.log('getUserID（）获取用户信息',UserInfo)
        if (!!UserInfo && !!UserInfo.id) {
            if (UserInfo.isAdmin === '1') {
              wx.navigateTo({
                url: e.currentTarget.dataset.url,
              })
              return;
            }
        } 
        wx.showToast({
          title: '你不是管理员',
          icon:'none'
        })
      } else {
        wx.navigateTo({
          url: e.currentTarget.dataset.url,
        })
      }
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
    if (!this.data.islogin) {
      this.getInfo()
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