// pages/page10/page10.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sg: 178,
        tz: 65,
        nl: 20,
        json: [
            {
                title: 'title1',
                list: [
                    {name: '[name1]'},
                    {name: '[name2]'},
                    {name: '[name3]'},
                    {name: '[name4]'},
                ]
            },
            {
                title: 'title2',
                list: [
                    {name: '[name1]'},
                    {name: '[name2]'},
                ]
            },
            {
                title: 'title3',
                list: [
                    {name: '[name2]'},
                    {name: '[name3]'},
                    {name: '[name4]'},
                ]
            },
            {
                title: 'title4',
                list: [
                    {name: '[name1]'},
                    {name: '[name2]'},
                    {name: '[name3]'},
                ]
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        /**
         * let 定义变量
         * const 定义常量
        */
        const CalInfo = wx.$storage.getStorage('CalInfo')
        const {cal,sex, age, weight, height} = CalInfo
        console.log(CalInfo)
        this.setData({
            sg: height,
            tz: weight,
            nl: age
        })
    },

    save: function() {
        const {nl,sg,tz} = this.data
        console.log(nl,sg,tz)
        wx.$storage.setStorage('CalInfo', JSON.stringify({
            "sex": "男",
            "age": nl,
            "weight": tz,
            "height": sg,
            "cal": 1073.64
        }))
        console.log(wx.$storage.getStorage('CalInfo'))
    },
    input: function(e) {
        this.setData({
            nl: e.detail.value
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