// pages/forum/forum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        id:1,
        userImg:'https://thirdwx.qlogo.cn/mmopen/vi_32/BiblaKjthHdwByiawFndE4x9CX2IebwH05r3xAXhwcQVXN0844W5ucutXVrJkarMwKN1Kmw8cQQ9URLaeNlWzEXQ/132',
        userName:'P',
        content:'阿握手我安慰活动我安居网我我店铺紧挨顽皮的简欧下午好的',
        menuID:20,
        menuName:'一饭',
        calorie:500,
        schoolName:'广东科技学院松山湖校区',
        schoolID:10,
        canteenID:30,
        canteenName:20,
        recordTime: '时间',
        menuType:'早餐',
        img:'https://thirdwx.qlogo.cn/mmopen/vi_32/BiblaKjthHdwByiawFndE4x9CX2IebwH05r3xAXhwcQVXN0844W5ucutXVrJkarMwKN1Kmw8cQQ9URLaeNlWzEXQ/132',
        forumTime:'一个小时前',
        forumType:'日常'
      },
      {
        id:1,
        userImg:'https://thirdwx.qlogo.cn/mmopen/vi_32/BiblaKjthHdwByiawFndE4x9CX2IebwH05r3xAXhwcQVXN0844W5ucutXVrJkarMwKN1Kmw8cQQ9URLaeNlWzEXQ/132',
        userName:'P',
        content:'aswodjaoiwjdoiawjodi内容内容awdohaowdjoiawji31208309128390812doajkhswdjchasoidhoiawdoiahwoduhoiajso我去玩活动啊无敌哦我奥委会毒霸无偶ID阿瓦活动我外婆的',
        menuID:20,
        menuName:'一饭',
        calorie:500,
        schoolName:'广东科技学院松山湖校区',
        schoolID:10,
        canteenID:30,
        canteenName:20,
        recordTime: '时间',
        menuType:'早餐',
        img:'https://thirdwx.qlogo.cn/mmopen/vi_32/BiblaKjthHdwByiawFndE4x9CX2IebwH05r3xAXhwcQVXN0844W5ucutXVrJkarMwKN1Kmw8cQQ9URLaeNlWzEXQ/132',
        forumTime:'一个小时前',
        forumType:'日常'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  jump(e) {
    console.log(e.currentTarget.dataset.forumid)
    wx.navigateTo({
      url: "/pages/forum/forumItem/forumItem",
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