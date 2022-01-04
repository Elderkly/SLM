// pages/menuItem/menuItem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{},
    isNew:false,
    canteen:[],
    addCanteenIndex:[],
    deleteCanteenID:[],
    addRecord:[],
    menu:[]
  },

  MaxCanteenID: null,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const storage = JSON.parse(wx.getStorageSync('settingSchoolItem'))
    if (!storage.schoolID) {
      console.log('新增')
      this.setData({isNew:true})
    } else {
      wx.$fetch({url:`/canteen/queryCanteenBySchoolID/${storage.schoolID}`})
      .then(res => {
        console.log('饭堂数据',res)
        const {menu} = this.data
        for (let i = 0; i< res.length; i++) {
          menu[i] = []
        }
        this.setData({
          canteen:res,
          menu
        },() => this.getMenu())
      })
    }
    this.setData({item:storage})
  },

  getMenu() {
    const {canteen,menu} = this.data
    for (let i = 0; i < canteen.length; i++) {
      wx.$fetch({url:`/canteen/getCanteenMenuRecord/${canteen[i].canteenID}`})
      .then(res => {
        menu[i] = res
        console.log('菜品数据',res)
        this.setData({menu})
      })
    }

    wx.$fetch({url:'/canteen/getMaxCanteenID'})
    .then(res => {
      console.log('最大饭堂ID',res)
      this.MaxCanteenID = res
    })
  },

  bindKeyInput: function (e) {
    const item = this.data.item
    item.schoolName = e.detail.value
    this.setData({
      item
    })
  },

  add() {
    wx.$fetch({
      url:'/school/addSchool',
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

  inputCanteen(e) {
      const value = e.detail.value
      const index = e.currentTarget.dataset.index
      const {canteen} = this.data 
      canteen[index].canteenName = value
      this.setData({canteen})
  },

  addMenu(e) {
    wx.navigateTo({
      url: `/pages/search/searchMenu?index=${e.currentTarget.dataset.index}`,
    })
  },

  async change() {
    const {addCanteenIndex,deleteCanteenID,canteen,addRecord} = this.data
    if (addCanteenIndex.length > 0) {
      const index = Math.min(...addCanteenIndex)
      for (let i = index; i < canteen.length; i++) {
        !!canteen[i].isNew ? delete canteen[i].isNew  : null
        await wx.$fetch({url:'/canteen/addCanteen',data:JSON.stringify(canteen[i]),method:"POST"}).then(res => console.log("插入",res))
      }
    }
    if (deleteCanteenID.length > 0) {
      for (let i = 0; i < deleteCanteenID.length; i++) {
        !!deleteCanteenID[i].isNew ? delete deleteCanteenID[i].isNew  : null
        wx.$fetch({url:`/canteen/deleteCanteen`,data:JSON.stringify(deleteCanteenID[i]),method:"POST"}).then(res => console.log('删除',res))
      }
    }
    if (addRecord.length > 0) {
      for (let i = 0; i < addRecord.length; i++) {
        !!addRecord[i].isNew ? delete addRecord[i].isNew  : null
        await wx.$fetch({url:'/canteen/addCanteenMenuRecord',data:JSON.stringify(addRecord[i]),method:"POST"})
        .then(res => console.log('记录',res))
      }
    }
  
    wx.$fetch({
      url:'/school/updateSchool',
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

  changeData(index,data) {
    console.log(index,data)
    const {menu,addRecord,canteen,item} = this.data
    menu[index].push(data)
    addRecord.push({
      ...data,
      canteenID:canteen[index].canteenID,
      canteenName:canteen[index].canteenName,
      schoolID:item.schoolID,
    })
    this.setData({menu,addRecord})
  },

  delete() {
    // console.log(this.data.item.menuID)
    wx.$fetch({url:`/school/deleteSchool/${this.data.item.schoolID}`,loading:true})
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

  addCanteen: function() {
    const {canteen,addCanteenIndex,menu} = this.data
    addCanteenIndex.push(canteen.length)
    canteen.push({
      canteenID: ++this.MaxCanteenID,
      canteenName: null,
      schoolID: this.data.item.schoolID,
      isNew:true
    })
    menu[menu.length] = []
    this.setData({canteen,addCanteenIndex,menu})
  },

  deleteCanteen(e) {
    console.log(e.currentTarget.dataset.index)
    const index = e.currentTarget.dataset.index
    const {canteen,deleteCanteenID,addCanteenIndex} = this.data
    !!canteen[index].canteenID ? (deleteCanteenID.push(canteen[index]),addCanteenIndex[0] !== null && addCanteenIndex[0]>0 ? addCanteenIndex[0] -= 1 : null) : (addCanteenIndex.splice(addCanteenIndex.findIndex(e => e === index),1))
    !!canteen[index].isNew ? this.MaxCanteenID-- : null
    canteen.splice(index,1) 
    console.log(canteen)
    this.setData({canteen,deleteCanteenID,addCanteenIndex})
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