// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 显示学校选择框
    showLog: false,
    // 显示大筛选框
    showDiaLog: false,
    // 当前选择学校
    school: "广东科技学院-松山湖校区",
    schoolID: null,
    // 学校数据
    schoolData: [],
    // 筛选数据
    tagJson: [],
    // 筛选选中数据
    selectItems: [],
    // 菜品数据
    MenuJson: [],
    BaseMenuJson: [],
    // 筛选index
    selectIndex: 0,
    // 开始抽
    start: false,
    // 步骤
    status: 1,
    changeTag: false
  },
  bindClick: function () {
    if (this.data.start || this.data.status === 2) return
    this.setData({
      showLog: !this.data.showLog
    })
  },
  changeSchool: function (event) {
    this.setData({
      school: event.currentTarget.dataset.school,
      showLog: false,
      schoolID: event.currentTarget.dataset.schoolid
    },this.changeMenu)
  },
  taptag: function (event) {
    const {
      boxIndex,
      name
    } = event.currentTarget.dataset
    const {
      selectItems
    } = this.data
    selectItems[boxIndex] = name
    console.log(selectItems)
    this.setData({
      selectItems,
      changeTag: true
    })
  },
  changeDiaLog: function () {
    if (this.data.start || this.data.status === 2) return
    if(this.data.showDiaLog && this.data.changeTag) {
      this.changeMenu()
    }
    this.setData({
      showDiaLog: !this.data.showDiaLog,
      changeTag: false
    })
  },
  startRandom: function () {
    if (this.data.MenuJson.length === 0) return
    const {
      start
    } = this.data
    if (!start) {
      this.setData({
        status: 1
      })
      this.interVal = setInterval(() => {
        const index = this.data.selectIndex + 1 === this.data.MenuJson.length ? 0 : this.data.selectIndex + 1
        this.setData({
          selectIndex: index
        })
        wx.vibrateShort({
          type: 'heavy'
        })
        console.log(this.data.MenuJson[this.data.selectIndex])
      }, 60)
    } else {
      clearInterval(this.interVal)
      this.setData({
        status: 2
      })
    }
    this.setData({
      start: !start
    })
  },
  save: function () {
    const Record = !!wx.$storage.getStorage('Record') ? wx.$storage.getStorage('Record') : []
    const foodData = this.data.MenuJson[this.data.selectIndex]
    foodData.time = new Date().getTime()
    foodData.schoolName = this.data.school
    Record.unshift(foodData)
    wx.$storage.setStorage('Record', JSON.stringify(Record))
    console.log(wx.$storage.getStorage('Record'))
    wx.vibrateShort({
      type: 'heavy'
    })
    wx.showToast({
      title: '保存成功'
    })
    this.setData({
      status: 3
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initStorage()
    this.initType()
    this.changeMenu()
  },

  initStorage() {
    const menu = wx.$storage.getStorage("Menu")
    const school = wx.$storage.getStorage("SchoolJson")
    if (!!menu) {
      this.setData({
        // MenuJson: menu,
        BaseMenuJson: menu,
        schoolData: school,
        school: school[0].schoolName,
        schoolID: school[0].schoolID
      })
    }
    this.initTag()
  },
  initTag() {
    const canTeen = wx.$storage.getStorage("CanTeen")
    console.log(canTeen)
    const newJson = []
    canTeen.map(e => {
      if (e.schoolName === this.data.school) {
        if (newJson[0]) {
          newJson[0].list.push({
            name: e.canteenName,
            id: e.id
          })
        } else {
          newJson.push({
            title: '饭堂',
            list: [{
              name: e.canteenName,
              id: e.id
            }, ]
          })
        }
      }
    })
    newJson.push({
      title: '类型',
      list: [{
          name: '早餐',
          id: 1
        },
        {
          name: '午餐',
          id: 2
        },
        {
          name: '晚餐',
          id: 3
        },
      ]
    })
    newJson.push({
      title: '热量',
      list: [{
          name: '低热量',
          id: 1
        },
        {
          name: '高热量',
          id: 2
        },
      ]
    })
    this.setData({
      tagJson: newJson
    })
    console.log(newJson)
  },
  initType() {
    const Hours = new Date().getHours()
    const type = Hours > 5 && Hours < 11 ? '早餐' :
      Hours > 11 && Hours < 15 ? '午餐' : '晚餐'
    console.log(Hours,'时',type)
    this.setData({
       ['selectItems[1]']: type
    })
  },
  changeMenu() {
    const {BaseMenuJson,school,selectItems,schoolID} = this.data
    const newJson = []
    BaseMenuJson.map((e,index) => {
      let pushE = null
      //  筛选学校和类型
      if (e.schoolID === schoolID && e.foodType.findIndex(x => x === selectItems[1]) !== -1) {
        pushE = e
        //  筛选饭堂
        if (!!selectItems[0]) {
          if (selectItems[0] === e.canteenName) {
            pushE = e
          } else {
            pushE = null
          }
        }
         //  筛选热量
        if (!!selectItems[2]) {
          if ((selectItems[2] === '低热量' && e.foodCal <= 150) || (selectItems[2] === '高热量' && e.foodCal >= 300)) {
            pushE = e
          } else {
            pushE = null
          }
        }
        if (!!pushE) {
          newJson.push(e)
        }
      }
    })
    this.setData({
      MenuJson: newJson,
      selectIndex: 0
    })
    console.log(newJson)
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
    if (this.data.start) {
      clearInterval(this.interVal)
      this.setData({
        start: false,
        status: 2
      })
    }
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