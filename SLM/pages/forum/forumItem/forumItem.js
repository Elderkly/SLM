// pages/forum/forumItem/forumItem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    forum: {
      userImg:null,
      userName:null,
      content:null,
      menuID:null,
      menuName:null,
      calorie:null,
      schoolName:null,
      schoolID:null,
      canteenID:null,
      canteenName:null,
      recordTime: null,
      menuType:null,
      img:null,
      forumTime:null,
      forumType:"日常",
      userID:null
    },
    userInfo:{},
    commit:[],
    submitCommit:{
      userID:null,
      userName:null,
      userImg:null,
      baseID:null,
      fatherID:null,
      fatherUserName:null,
      content:null,
      commitType:'forum',
      commitTime:null
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const UserInfo = wx.$storage.getStorage('UserInfo')
    const forum = wx.$storage.getStorage('forumItem')
    let {submitCommit} = this.data
    submitCommit = {...submitCommit,userID:UserInfo.id,userName:UserInfo.userName,userImg:UserInfo.userImg,baseID:forum.id,fatherID:forum.id}
    this.setData({forum,userInfo:UserInfo,submitCommit})
    this.getCommit()
  },
  toMenuDetails(e) {
    wx.$storage.setStorage('HomeMenuItem', JSON.stringify(e.currentTarget.dataset.item))
    wx.navigateTo({
      url: '/pages/mark/mark',
    })
  },
  
  deleteCommit(e) {
    wx.$fetch({url:`/commit/deleteCommit/${e.currentTarget.dataset.commitid}`,loading: true})
    .then(res => {
      if (res === 1) {
        setTimeout(() => {
          wx.showToast({
            title: '删除成功',
            icon:'success',
            duration:1300
          })
        },300)
        setTimeout(() => {
          this.getCommit()
        },1200)
      } else {
        wx.showToast({
          title: '删除失败',
          icon:'none',
          duration:1500
        })
      }
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
          wx.navigateBack()
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

  getCommit() {
    const {forum} = this.data
    wx.$fetch({
      url:`/commit/selectCommitByBaseID/${forum.id}/forum`,
      loading:true
    }).then(res => {
      this.reStorage(res)
    })
  },

  secondCommit(e) {
    const {item} = e.currentTarget.dataset
    let {submitCommit} = this.data
    submitCommit = {...submitCommit,fatherID:item.id,fatherUserName:item.userName}
    this.setData({focus:true,submitCommit})
  },

  bindblur() {
    console.log("失去焦点")
    let {submitCommit} = this.data
    submitCommit = {...submitCommit,fatherID:submitCommit.baseID,fatherUserName:null}
    this.setData({submitCommit})
  },

  reStorage(res) {
    const newJson = []
    res.map(e => {
      e.commitTime = wx.$utils.transTimePassed(e.commitTime)
      if (e.baseID === e.fatherID) {
        e.commit = []
        newJson.push(e)
      } else {
        const index = newJson.findIndex(x => x.id === e.fatherID)
        index !== -1 ? newJson[index].commit.push(e) : null
      }
    })
    newJson.sort(e => -1)
    this.setData({commit:newJson})
    // console.log(newJson)
  },

  changeContent(e) {
    if (!!e.detail.value) {
      const {submitCommit} = this.data
      submitCommit.content = e.detail.value
      this.setData({submitCommit})
    }
  },

  submit() {
    let {submitCommit} = this.data
    console.log(submitCommit)
    submitCommit.commitTime = String(new Date().getTime())
    if (!!submitCommit.content) {
      wx.$fetch({
        url:`/commit/addCommit`,
        method:'POST',
        loading:true,
        data:JSON.stringify(submitCommit)
      }).then(res => {
        if (res === 1) {
          submitCommit = {...submitCommit,fatherID:submitCommit.baseID,fatherUserName:null,content:null}
          this.setData({submitCommit})
          this.getCommit()
        } else {
          wx.showToast({
            title: '发送失败',
            icon:'none'
          })
        }
      })
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