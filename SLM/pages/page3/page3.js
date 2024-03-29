// pages/page3/page3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    school:[]
  },
  fromForum:false,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   school :JSON.parse(wx.getStorageSync("Record"))
    // })
    if (!!options && options.from === "forum") {
      this.fromForum = true
    }
  },

  getData() {
    const UserInfo = wx.$storage.getStorage('UserInfo')
    console.log('getUserID（）获取用户信息',UserInfo)
    if (!!UserInfo && !!UserInfo.id) {
        wx.$fetch({url:`/randomRecord/getUserRandomRecord/${UserInfo.id}`})
        .then(res => {
          console.log(res)
          if (res.length > 0) {
            this.setData({school:res})
          }
        })
    } else {
      console.log('用户未登录')
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
    this.getData()
  },   
  viewBtn :function(e){
    if (this.fromForum) {
      const pages = getCurrentPages();
      const beforePage = pages[pages.length - 2]; // 前一个页面
      beforePage.changeMenu(e.currentTarget.dataset.item); //调用上个页面的方法
      //  2.写入成功后 关闭当前页面
      wx.navigateBack()
    } else {
      wx.setStorage({
        data: JSON.stringify(e.currentTarget.dataset.item),
        key: 'page4Items',
      })
      wx.navigateTo({
      url:'../page4/page4'
      })
    }
  },  
  delete(id){
    console.log('page3',id)
    if(!!id) {
      const index = this.data.school.findIndex(e => e.id === id)
      if (index !== -1) {
        console.log(index)
        const {school} = this.data
        school.splice(index, 1)
        wx.$storage.setStorage('Record', JSON.stringify(school))
    
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