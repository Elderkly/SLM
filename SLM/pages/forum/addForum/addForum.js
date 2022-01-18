// SLM/pages/forum/addForum/addForum.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        item: {
            userImg:null,
            userName:null,
            content:null,
            menuID:null,
            menuName:null,
            calorie:null,
            schoolName:null,
            schoolID:null,
            canteenID:null,
            canteenName:null,
            recordTime: null,
            menuType:null,
            img:null,
            forumTime:null,
            forumType:"日常",
            userID:null
          },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const UserInfo = wx.$storage.getStorage('UserInfo')
        console.log('getUserID（）获取用户信息',UserInfo)
        let {item} = this.data
        item = {...item,userID:UserInfo.id,userName:UserInfo.userName,userImg:UserInfo.userImg}
        this.setData({item})
    },

    changeType(e) {
        // console.log(e.currentTarget.dataset.type)
        const {item} = this.data
        item.forumType = e.currentTarget.dataset.type
        this.setData({item})
    },
    deleteMenu() {
        let {item} = this.data
        item = {...item,...{menuID:null,menuName:null,calorie:null,schoolName:null,schoolID:null,canteenID:null,canteenName:null,recordTime:null,menuType:null,img:null}}
        this.setData({item})
    },
    selectMenu() {
        wx.navigateTo({
          url: '/pages/page3/page3?from=forum',
        })
    },
    changeMenu(e) {
        console.log(e)
        let {item} = this.data
        item = {...item,...{menuID:e.menuID,menuName:e.menuName,calorie:e.calorie,schoolName:e.schoolName,schoolID:e.schoolID,canteenID:e.canteenID,canteenName:e.canteenName,recordTime:e.recordTime,menuType:e.menuType,img:e.img}}
        this.setData({item})
    },
    changeContent(e) {
        const {item} = this.data
        item.content = e.detail.value
    },
    submit() {
        console.log(this.data.item)
        const {item} = this.data
        if (!!item.content) {
            item.forumTime = String(new Date().getTime())
            wx.$fetch({
                url:'/forum/addForum',
                method:'POST',
                data:JSON.stringify(item)
            })
            .then(res => {
                if (res === 1) {
                    wx.showToast({
                        title: '发布成功',
                        duration: 1800,
                        icon:'success',
                        complete:() => {
                            setTimeout(() => wx.navigateBack(),2000)
                        }
                    })
                } else {
                    wx.showToast({
                        title: '发布失败',
                        duration: 1800,
                        icon:"none"
                    })
                }
            })
        } else {
            wx.showToast({
              title: '请输入帖子内容',
              duration: 1200,
              icon:'none'
            })
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