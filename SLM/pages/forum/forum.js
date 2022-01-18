// pages/forum/forum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{}],
    userInfo:{},
    selectIndex:0
  },

  baseData:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  changeSelectItem(e) {
    this.setData({
      selectIndex:e.currentTarget.dataset.index
    },() => this.selectList())
  },
  jump(e) {
    console.log(e.currentTarget.dataset.item)
    wx.$storage.setStorage('forumItem', JSON.stringify(e.currentTarget.dataset.item))
    wx.navigateTo({
      url: "/pages/forum/forumItem/forumItem",
    })
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
          this.getList()
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
  addForum() {
    wx.navigateTo({
      url: '/pages/forum/addForum/addForum',
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
    this.setData({userInfo:UserInfo})
    this.getList()
  },

  selectList() {
    const baseData = this.baseData
    const {selectIndex} = this.data
    const selectTag = ['全部','日常','分享','询问']
    const seletType = selectTag[selectIndex]
    let newList = []
    if (seletType === '全部') {
      newList = baseData
    } else {
      baseData.map(e => e.forumType === seletType ? newList.push(e) : null)
    }
    this.setData({list:newList})
  },
  getList() {
    wx.$fetch({url:'/forum/getAllForum'})
    .then(res => {
      this.changeListData(res)
      this.selectList()
      setTimeout(() => wx.stopPullDownRefresh(),300)
    })
  },
  changeListData(res) {
    res.map(e => e.forumTime = wx.$utils.transTimePassed(e.forumTime))
    this.baseData = res
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
    this.getList()
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