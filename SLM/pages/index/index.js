// pages/index/index.js
import {formatData} from '../../common/Utils'
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
    changeTag: false,
    showFixedView: false,
    FixedViewText: null
  },
  bindClick: function () {
    if (this.data.start || this.data.status === 2) {
      wx.showToast({
        icon: 'none',
        title: '抽取完毕后才可变更筛选条件哦',
      })
      return
    }
    this.setData({
      showLog: !this.data.showLog
    })
  },
  changeSchool: function (event) {
    this.setData({
      school: event.currentTarget.dataset.school,
      showLog: false,
      schoolID: event.currentTarget.dataset.schoolid,
      status: 1
    },this.changeData)
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
    if (this.data.start || this.data.status === 2) {
      wx.showToast({
        icon: 'none',
        title: '抽取完毕后才可变更筛选条件哦',
      })
      return
    }
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
    this.initFixedView()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initStorage()
    this.initType()
    // this.changeMenu()
    this.initFixedView()
  },

  initFixedView() {
    const Record = wx.$storage.getStorage("Record")
    const UserCal = wx.$storage.getStorage("CalInfo")
    const Time = formatData(new Date().getTime())
    let sumCal = 0
    let text = null
    // console.log(Time,Record)
    !!Record && Record.map(e => Time === formatData(e.time) ? sumCal += e.foodCal : null)
    console.log(`卡路里临界值${UserCal.cal},当天摄入卡路里${sumCal}`)
    if (UserCal.cal * 0.8 < sumCal && UserCal.cal > sumCal) {
      text = '当天摄入卡路里即将大于临界值 推荐选择低热量食物'
    } else if (UserCal.cal * 0.98 < sumCal && UserCal.cal >= sumCal){
      text = '当天摄入卡路里已达到临界值'
    } else if (UserCal.cal * 1.2 < sumCal && UserCal.cal * 1.5 > sumCal){
      text = '当天摄入卡路里已达到临界值的1.2倍 求求你别吃了'
    } else if (UserCal.cal * 1.5 <= sumCal){
      text = '不会吧不会吧 不会真的有人这么能吃吧'
    }
    
    if (text) {
      if (this.data.showFixedView) {
        this.changeFixedStatus(false)
        setTimeout(() => {
          this.setData({
            FixedViewText: text
          }, this.changeFixedStatus(true))
        },600) 
        return 
      }
      this.setData({
        FixedViewText: text
      }, this.changeFixedStatus(true))
    }
  },

  hiddenFixedView() {
    this.changeFixedStatus(false)
  },

  changeFixedStatus(show) {
    this.timeOut && clearTimeout(this.timeOut)
    if(show) {
      this.setData({
        hiddenFixedView: false,
        showFixedView: true
      },() => this.timeOut = setTimeout(() => this.changeFixedStatus(false),6000))
    } else {
      this.setData({
        hiddenFixedView: true
      },() => this.timeOut = setTimeout(() => this.setData({showFixedView: false}),300))
    }
  },
  async initStorage() {
    // const menu = wx.$storage.getStorage("Menu")
    // const school = wx.$storage.getStorage("SchoolJson")
    // if (!!menu) {
    //   this.setData({
    //     // MenuJson: menu,
    //     BaseMenuJson: menu,
    //     schoolData: school,
    //     school: school[0].schoolName,
    //     schoolID: school[0].schoolID
    //   })
    // }
    // this.initTag()
    await this.initSchoolData()
    await this.changeData()
  },

  async changeData() {
    await this.initCanteenData()
    await this.initBasisData()
  },

  async initSchoolData() {
    await wx.$fetch({url:`/school/allSchool`})
    .then(res => {
      console.log('学校',res)
      if (res.length > 0) {
        this.setData({
          schoolData: res,
          school: res[0].schoolName,
          schoolID: res[0].schoolID
        })
      }
    })
  },

  async initCanteenData() {
    await wx.$fetch({url:`/canteen/queryCanteenBySchoolID/${this.data.schoolID}`})
    .then(res => {
      console.log('饭堂',res)
      this.initTag(res)
      // if (res.length > 0) {
      //   this.setData({
      //     schoolData: res,
      //     school: res[0].schoolName,
      //     schoolID: res[0].schoolID
      //   })
      // }
    })
  },

  async initBasisData() {
    const {tagJson,selectItems} = this.data
    if (tagJson.findIndex(e => e.title === '饭堂') === -1) {
      this.setData({MenuJson:[]})
      return
    }
    const index = tagJson[0].list.findIndex(e => e.name === selectItems[0])
    console.log(index)
    const canteenID = tagJson[0].list[index].id
    wx.$fetch({url:`/canteen/getCanteenMenuRecord/${canteenID}`})
    .then(res => {
      console.log('菜品',res)
      if (res.length >= 0) {
        this.setData({MenuJson:res})
      }
    })
  },

  initTag(res) {
    // const canTeen = wx.$storage.getStorage("CanTeen")
    // console.log(canTeen)
    const {selectItems} = this.data
    const newJson = []
    res.map(e => {
        if (newJson[0]) {
          newJson[0].list.push({
            name: e.canteenName,
            id: e.canteenID
          })
        } else {
          newJson.push({
            title: '饭堂',
            list: [{
              name: e.canteenName,
              id: e.canteenID
            }, ]
          })
        }
    })
    selectItems[0] = newJson[0] ? newJson[0].list[0].name : null
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
      tagJson: newJson,
      selectItems
    })
    console.log(newJson,selectItems)
  },
  initType() {
    const Hours = new Date().getHours()
    const type = Hours >= 5 && Hours < 11 ? '早餐' :
      Hours >= 11 && Hours < 15 ? '午餐' : '晚餐'
    console.log(Hours,'时',type)
    this.setData({
       ['selectItems[1]']: type
    })
  },
  changeMenu() {
    console.log(123)
    this.initBasisData()
    return
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
   * 生命周期函数--监听页面初次渲染完成123
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.hidden) {
      // this.initStorage()
      // this.initType()
      // this.changeMenu()
      this.hidden = false
    }
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
    this.hidden = true
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
    console.log(this.data.status)
    const {status, MenuJson, selectIndex} = this.data
    const text = status === 1 || !MenuJson[selectIndex]? '今日食点咩' : `今日食${MenuJson[selectIndex].canteenName}-${MenuJson[selectIndex].foodName}`
    const img = status === 1 || !MenuJson[selectIndex]? '../../assets/img/logo.jpeg' : MenuJson[selectIndex].img
    return {
      title: text,
      path: '/pages/index/index',
      imageUrl: img
    }
  }
})