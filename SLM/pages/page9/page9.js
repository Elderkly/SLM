// pages/page9/page9.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseData1: {

    },
    baseData2: [],
    storgaeCanTeen: [],
    storageMenu: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const storage = JSON.parse(wx.getStorageSync('page9Items'))
    this.setData({
      baseData1: {
        name: storage.schoolName,
        ftNum: storage.canteenNums,
        foodNum: storage.menuNums,
        id: storage.id,
        schoolID: storage.schoolID
      },
    })
    this.initFT()
  },

  initFT() {
    const FT = wx.$storage.getStorage("CanTeen")
    const newJson = []
    FT.map(e => {
      console.log(e)
      if (e.schoolName === this.data.baseData1.name)
        newJson.push(e)
    })
    this.setData({
      storgaeCanTeen: FT
    })
    console.log(newJson)
    if (newJson.length > 0) {
       this.initMenu(newJson)
    } else {
      const Menu = wx.$storage.getStorage("Menu")
      this.setData({
        baseData2: [],
        storageMenu: Menu
      })
    }
  },

  initMenu(FT) {
    const Menu = wx.$storage.getStorage("Menu")
    const newJson = FT
    Menu.map(e => {
      const index = newJson.findIndex(x => x.canteenID === e.canteenID)
      if (index !== -1) {
        if (newJson[index].list && newJson[index].list.length > 0) {
          newJson[index].list.push(e)
        } else {
          newJson[index].list = [e]
        }
      }
    })
    console.log(Menu)
    this.setData({
      baseData2: newJson,
      storageMenu: Menu
    })
  },
  addMenu(e) {
    console.log(e.currentTarget.dataset.index)
    const {baseData2,storageMenu} = this.data
    const base = {
      id: this.data.storageMenu.length + 1,
      foodID:	'f00' + (this.data.storageMenu.length + 1),
      foodName:	'',
      foodCal:	0,
      canteenID:baseData2[e.currentTarget.dataset.index].canteenID,
      canteenName	:	baseData2[e.currentTarget.dataset.index].canteenName,
      foodType:[],
      schoolID:	baseData2[e.currentTarget.dataset.index].schoolID,
    }
    baseData2[e.currentTarget.dataset.index].list.push(base)
    storageMenu.push(base)
    this.setData({
      baseData2
    })
  },
  deleteMenu (e) {
    const {index,bindex,foodid} = e.currentTarget.dataset
    const {baseData2,storageMenu} = this.data
    baseData2[bindex].list.splice(index, 1)
    const SIndex = storageMenu.findIndex(e => e.foodID === foodid)
    if (SIndex !== -1) {
      storageMenu.splice(SIndex,1)
    }
    this.setData({
      baseData2,
      storageMenu
    },this.updateStorage)
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.currentTarget.dataset.index)
    const {bindex, index, foodid} = e.currentTarget.dataset
    const {baseData2, storageMenu} = this.data
    const baseJson = [null,null,null]
    e.detail.value.map(e => {
      switch(e) {
        case '早餐':
          baseJson[0] = e
          break;
        case '午餐':
        baseJson[1] = e
        break;
        case '晚餐':
        baseJson[2] = e
        break;
      }
    })
    baseData2[bindex].list[index].foodType = baseJson
    const SIndex = storageMenu.findIndex(e => e.foodID === foodid)
    storageMenu[SIndex].foodType = baseJson
    this.setData({
      baseData2,
      storageMenu
    },this.updateStorage)
    console.log(bindex, index, foodid)
  },
  changeName(e) {
    const {bindex, index, foodid} = e.currentTarget.dataset
    const {baseData2,storageMenu} = this.data
    console.log(bindex, index, foodid)

    baseData2[bindex].list[index].foodName = e.detail.value
    const SIndex = storageMenu.findIndex(e => e && e.foodID === foodid)
    if (SIndex !== -1) {
      storageMenu[SIndex].foodName = e.detail.value
    }
    this.setData({
      baseData2,
      storageMenu
    },this.updateStorage)
  },
  changeCal(e) {
    const {bindex, index, foodid} = e.currentTarget.dataset
    const {baseData2,storageMenu} = this.data
    baseData2[bindex].list[index].foodCal = Number(e.detail.value)
    const SIndex = storageMenu.findIndex(e => e.foodID === foodid)
    if (SIndex !== -1) {
      storageMenu[SIndex].foodCal = Number(e.detail.value)
    }
    this.setData({
      baseData2,
      storageMenu
    },this.updateStorage)
  } ,
  updateStorage() {
    console.log(this.data.storgaeCanTeen)
    wx.$storage.setStorage("Menu",JSON.stringify(this.data.storageMenu))
    wx.$storage.setStorage("CanTeen",JSON.stringify(this.data.storgaeCanTeen))
  },
  addCanteen() {
    const {baseData1,baseData2,storgaeCanTeen} = this.data
    const base = {
      id:	storgaeCanTeen.length,
      canteenID	:	'c000' + (storgaeCanTeen.length + 1),
      canteenName	:	'饭堂名称',
      schoolName	:	baseData1.name,
      schoolID	:	baseData1.schoolID,
      list:[],
    }
    baseData2.push(base)
    storgaeCanTeen.push({
      id:	storgaeCanTeen.length,
      canteenID	:	'c000' + (storgaeCanTeen.length + 1),
      canteenName	:	'饭堂名称',
      schoolName	:	baseData1.name,
      schoolID	:	baseData1.schoolID,
    })
    this.setData({
      baseData2,
      storgaeCanTeen
    },this.updateStorage)
  },
  deleteCanteen(e) {
    const {index,canteenid} = e.currentTarget.dataset
    const {baseData2,storgaeCanTeen} = this.data
    console.log(index,canteenid)
    baseData2.splice(index, 1)
    const SIndex = storgaeCanTeen.findIndex(e => e.canteenID === canteenid)
    console.log(SIndex)
    if (SIndex !== -1) {
      storgaeCanTeen.splice(SIndex, 1)
    }
    this.setData({baseData2,storgaeCanTeen},this.updateStorage)
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