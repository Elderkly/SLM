// pages/forum/myForum/myForum.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        forumList:[],
        userInfo:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },
    delete(e) {
        console.log(e.currentTarget.dataset.forumid)
        wx.$fetch({url:`/forum/deleteForum/${e.currentTarget.dataset.forumid}`,loading:true})
        .then(res => {
          if (res === 1) {
            setTimeout(() => {
              wx.showToast({
                title: '删除成功',
                icon:'success',
                duration:1500
              })
            },300)
            setTimeout(() => {
              this.getForum()
            },1500)
          } else {
            wx.showToast({
              title: '删除失败',
              icon:'none',
              duration:1500
            })
          }
        })
      },

    getForum() {
        wx.$fetch({url:`/forum/selectForumByUserID/${this.data.userInfo.id}`})
        .then(res => {
          this.setData({forumList:res})
        })
      },
      jumpToForum(e) {
        wx.$storage.setStorage('forumItem', JSON.stringify(e.currentTarget.dataset.item))
        wx.navigateTo({
          url: "/pages/forum/forumItem/forumItem",
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
        const UserInfo = wx.$storage.getStorage('UserInfo')
        console.log('getUserID（）获取用户信息',UserInfo)
        this.setData({userInfo:UserInfo},() => this.getForum())
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