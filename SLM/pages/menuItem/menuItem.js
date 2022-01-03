// pages/menuItem/menuItem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{},
    foodType:[0,0,0],
    isNew:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const storage = JSON.parse(wx.getStorageSync('settingMenuItem'))
    if (!storage.menuID) {
      console.log('新增')
      this.setData({isNew:true})
    }
    const foodType = this.data.foodType
    const type = ['早餐','午餐','晚餐']
    for (let i = 0; i < type.length; i++) {
      if (storage.menuType.indexOf(type[i]) !== -1) {
        foodType[i] = 1
      }
    }
    this.setData({item:storage,foodType})
  },

  bindKeyInput: function (e) {
    const item = this.data.item
    item.menuName = e.detail.value
    this.setData({
      item
    })
  },
  bindKeyInput2: function (e) {
    const item = this.data.item
    item.calorie = e.detail.value
    this.setData({
      item
    })
  },
  checkboxChange(e) {
    // console.log('checkbox发生change事件，携带value值为：', e)
    let string = ''
    e.detail.value.sort()
    e.detail.value.map(even => {
      switch(even) {
        case '0':
          string += '早餐'
          string += e.detail.value.length > 1 ?  '，' : ''
          break;
        case '1':
          string += '午餐'
          string += e.detail.value.length > 2 || (e.detail.value[0] === '1' && e.detail.value.length == 2) ?  '，' : ''
        break;
        case '2':
          string += '晚餐'
        break;
      }
    })
    const item = this.data.item
    item.menuType = string
    this.setData({item})
    console.log(string)
  },

  add() {
    wx.$fetch({
      url:'/menu/addMenu',
      method:"POST",
      data:JSON.stringify(this.data.item),
      loading:true
    }).then(res => {
      // console.log(res)
      if (res === 1) {
        wx.showToast({
          title: '新增成功',
          icon: 'success',
          duration: 1000,
          complete: () => {
            setTimeout(() => {
              wx.navigateBack()
            },1300)
          }
        })
      } else {
        wx.showToast({
          title: '新增失败',
          icon: 'error',
          duration: 1000
        })
      }
    })
  },

  change() {
    wx.$fetch({
      url:'/menu/updateMenu',
      method:"POST",
      data:JSON.stringify(this.data.item),
      loading:true
    }).then(res => {
      // console.log(res)
      if (res === 1) {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 1000,
          complete: () => {
            setTimeout(() => {
              wx.navigateBack()
            },1300)
          }
        })
      } else {
        wx.showToast({
          title: '修改失败',
          icon: 'error',
          duration: 1000
        })
      }
    })
  },

  delete() {
    console.log(this.data.item.menuID)
    wx.$fetch({url:`/menu/deleteMenu/${this.data.item.menuID}`,loading:true})
    .then(res => {
      if (res === 1) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1000,
          complete: () => {
            setTimeout(() => {
              wx.navigateBack()
            },1300)
          }
        })
      } else {
        wx.showToast({
          title: '删除失败',
          icon: 'error',
          duration: 1000
        })
      }
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