// pages/page7/page7.js
Page({

  /**
   * 页面的初始数据
   */
  data: {                                                                            /*设定一个初始值*/
    CM:null,                                                                         /*CM 的初始值为空*/
    KG:null,                                                                         /*KG 的初始值为空*/
    YEAR:null,                                                                       /*YEAR 的初始值为空*/
    Kcal:0                                                                           /*Kcal 的初始值为空*/
  },

  changeInput(event) {                                                               /*定义输入框事件*/
    const key = event.currentTarget.dataset.key                                      /*定义一个 key 获取event.currentTarget.dataset.key的缓存地址 */
    const value = event.detail.value                                                 /*定义一个 value 获取event.detail.value的缓存地址 */
    console.log(key,value)                                                           /*打印 key 和 value 的数据*/
    //[665+3.6 X 体重 + 1.5 X 身高 + 4.7 X 年龄]+1.2=1580Kcal
    this.setData({
      [key]: value                                                                   /*将 key 对应的值改变成 value*/
    })
    this.changeKcal()
  },

  changeKcal() {
    const {CM,KG,YEAR} = this.data                                                   /*CM,KG,YEAR 对应 this.data里的CM,KG,YEAR*/
    const Kcal = (665 + 3.6 * KG + 1.5 * CM + 4.7 * YEAR) * 1.2                      /*计算 Kcal 的公式*/
    
    console.log(this.setdata,Kcal.toFixed(2))                                        /*打印this.data,Kcal里的数据*/
    this.setData({
      Kcal: Kcal.toFixed(2)                                                          /*结果保留两位小数*/
    })                                                                               /*改变Kcal的值*/
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const kk = wx.$storage.getStorage('UserInfo')                                     /*定义 kk 获取 CalInfo的数据*/
    
    console.log(kk)                                                                  /*打印 kk 里的数据*/

    this.setData({CM:kk.height,KG:kk.weight,YEAR:kk.age},() => this.changeKcal())                /*CM的数据等于kk.height，KG的数据等于kk.weight，YEAR的数据等于kk.age，Kcal的数据等于kk.cal*/
  },

  save(){ /*定义保存事件*/
    
    const cm = this.data.CM                                                          /*保存初始页面是上一次缓存的cm数据*/
    const kg = this.data.KG                                                          /*保存初始页面是上一次缓存的kg数据*/
    const year = this.data.YEAR                                                      /*保存初始页面是上一次缓存的year数据*/
    const kcal = this.data.Kcal                                                      /*保存初始页面是上一次缓存的kcal数据*/
    console.log("sj"+cm+kg+year+kcal)                                                /*答应数据*/

  
        
        wx.$storage.setStorage('CalInfo', JSON.stringify({
            "sex": "男",
            "age": year,
            "weight": kg,
            "height": cm,
            "cal": kcal
        }))                                                                          /*覆盖掉缓存里的数据*/
        console.log(wx.$storage.getStorage('CalInfo'))                               /*打印上一次输入的缓存数据*/

        wx.showToast({                                                               /*定义点击按钮事件*/
          title: '保存成功',                                                          /*文字 保存成功*/
          icon: 'success',                                                           /*成功保存*/
          duration: 2000})                                                           /*存在两秒*/
  
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