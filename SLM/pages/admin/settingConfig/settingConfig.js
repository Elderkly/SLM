// pages/admin/settingConfig/settingConfig.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        _checked:[0,0,0]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getConfig()
    },

    getConfig() {
        const {_checked} = this.data
        wx.$fetch({url:"/config/getConfig"})
        .then(res => {
            if (res !== null) {
                this.setData({config: res})
                let j = 0;
                for(const i in res) {
                    _checked[j++] = res[i]
                }
                this.setData({_checked})
            }
        })
    },
    change(e) {
        const {_checked} = this.data
        const index = e.currentTarget.dataset.index,value = e.detail.value
        _checked[index] = value
        this.setData({_checked})
        this.submit()
    },
    submit() {
        const {_checked} = this.data
        const newObj = {}
        const key = ['showHomeMenu','showHomeForum','showForumModel']
        _checked.map((e,index) => newObj[key[index]] = !!e ? 1 : 0)
        console.log(newObj)
        wx.$fetch({url:'/config/setConfig',method:"POST",loading:true,data:JSON.stringify(newObj)})
        .then(res => {
            if (res === 0) {
                wx.showToast({
                  title: '修改失败',
                  icon:'none'
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