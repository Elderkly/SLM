// pages/page4/page4.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
      school:{},
     qq:{

     },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //  console.log(options.key1)
  //   if (!!JSON.parse(options.key1)) {
  //     console.log(JSON.parse(options.key1).schoolName)
  //     this.setData({
  //       school:JSON.parse(options.key1)
  //     })
     
  //   }
  //   wx.setStorageSync('key1',optio  ns.key1 )
    const page4Items = wx.getStorageSync('page4Items')
    
    this.setData ({
      school:JSON.parse(page4Items)
    })
  
      //  this.setData({
      //   data=1
      //  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (data) {
 
 
  },

  changeData(index,data) {
    const {school} = this.data
    const newJson = {...school,...data}
    this.setData({school:newJson})
    wx.$fetch({
      url:`/randomRecord/changeRandomRecord`,
      method:'POST',
      data:JSON.stringify(newJson),
      loading:true
    }).then(res => {
      if (res === 1) {
        wx.showToast({
          title: '修改成功',
        })
      } else {
        wx.showToast({
          title: '修改失败',
          icon:'none'
        })
      }
    })
    console.log(school,newJson)
    // school.schoolName = data.schoolName
    // school.foodCal = data.foodCal
    // school.foodName = data.foodName
    // this.setData({school})
    // this.setData({
    //   qq:JSON.parse(wx.getStorageSync("Record"))
    // })
    // this.data.qq.splice(this.data.qq.findIndex((qq)=>(qq.foodID ==school.foodID)),1,school)
    // wx.$storage.setStorage('Record', JSON.stringify(this.data.qq))
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
  updateBtn: function(){
     wx.navigateTo({
       url:'/pages/search/searchMenu'
     })
  },

deleteBtn: function(options){
 wx.showModal({
  title: '提示',
  content: '是否删除记录',
  success: (rees) => {
  if (rees.confirm) {
    wx.$fetch({url:`/randomRecord/deleteRecord/${this.data.school.id}`})
    .then(e => {
      if (e === 1) {
        wx.showToast({
          title: '删除成功',
          success:() => {
            setTimeout(() => wx.navigateBack(),1300)
          }
        })
      } else {
        wx.showToast({
          title: '删除失败',
          icon:'none'
        })
        console.log(e)
      }
    })
    // console.log(beforePage)

  } else if (rees.cancel) {
  console.log('用户点击取消')
  }
  }
})},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})