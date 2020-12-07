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
    //根据page8跳转写入的缓存
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
/*
初始化饭堂
1.先拿饭堂的缓存，创建一个newjson数组
2.用map方法遍历缓存里的饭堂，判断缓存内学校是否与当前学校是否一致
3.如果一致，为每一个饭堂添加list字段，push进去
4.最后将其重新写入缓存
5.如果当前饭堂长度大于0，那就可以初始化菜单，
否则给个空数组，从原始缓存中读取数据Menu
*/
  initFT() {
    const FT = wx.$storage.getStorage("CanTeen")
    const newJson = []
    FT.map(e => {
      console.log(e)
      if (e.schoolName === this.data.baseData1.name){
        e.list = []
        newJson.push(e)
      }
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
/*
初始化菜单
1.先从缓冲中拿取Menu数据
2.将初始化饭堂FT定义为newjson
3.用map方法遍历Menu，并且用findIndex方法查找newjson的饭堂id存在于缓存中饭堂id就返回下标
如果查不到，则为-1
4. 有下标的话，如果该下标的list存在并且长度大于0，则把e就是Menu的每一项遍历push给list
若无就初始化将e就是Menu的每一项遍历赋值给list
5.重新写入缓存和当前数据
*/
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
  /*
添加菜品


  */
  addMenu(e) {
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
    // console.log(e.currentTarget.dataset.index)
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
  },
  changeCanteenName(e) {
    const {index, canteenid} = e.currentTarget.dataset
    const {baseData2,storgaeCanTeen} = this.data
    console.log(index, canteenid)
    baseData2[index].canteenName = e.detail.value
    const SIndex = storgaeCanTeen.findIndex(e => e.canteenID === canteenid)
    if (SIndex !== -1) {
      storgaeCanTeen[SIndex].canteenName = e.detail.value
    }
    this.setData({
      baseData2,
      storgaeCanTeen
    },this.updateStorage)
  },
  /*
  更新缓存
1.将Menu、CanTeen，并且转换为字符串写入缓存
2. 饭堂数量、菜品数量更新
  */
  updateStorage() {
    console.log(this.data.storgaeCanTeen)
    wx.$storage.setStorage("Menu",JSON.stringify(this.data.storageMenu))
    wx.$storage.setStorage("CanTeen",JSON.stringify(this.data.storgaeCanTeen))
    //饭堂数量、菜品数量更新
    const {baseData1} = this.data                   //获取整个页面的数据  
    baseData1.ftNum = this.data.baseData2.length;   //饭堂数量就是baseData2数组每一项都是一个饭堂
    console.log(nthis.data.baseData2);
    var num = 0;      //统计菜品数量
    for(var i = 0;i<baseData1.ftNum;i++){           //遍历饭堂下的每一个list数组，该数组存储的是菜品
       num += this.data.baseData2[i].list.length;
    }
    console.log(num);
    baseData1.foodNum =num  ;
    this.setData({baseData1})     //更新数据
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
  deleteSchool() {
    var pages = getCurrentPages();
    var beforePage = pages[pages.length - 2]; // 前一个页面
    beforePage.deleteSchool(this.data.baseData1.schoolID)
    wx.navigateBack()
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