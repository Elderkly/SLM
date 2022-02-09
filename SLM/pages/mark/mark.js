// pages/mark/mark.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:{},
        commit:[],
        score: {
            mainScore: 0.0,
            people: 0,
            start:0,
        },
        myScore: {
            score: 0,
            start: 0
        },
        item:{},
        focus: false,
        submitCommit:{
            userID:null,
            userName:null,
            userImg:null,
            baseID:null,
            fatherID:null,
            fatherUserName:null,
            content:null,
            commitType:'menu',
            commitTime:null
        },
        showSubmit:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const UserInfo = wx.$storage.getStorage('UserInfo')
        const HomeData = wx.$storage.getStorage('HomeMenuItem')
        let {submitCommit} = this.data
        if (!!UserInfo) {
            submitCommit = {...submitCommit,userID:UserInfo.id,userName:UserInfo.userName,userImg:UserInfo.userImg,baseID:HomeData.menuID,fatherID:HomeData.menuID}
            this.setData({userInfo:UserInfo,submitCommit})
        }
        this.setData({item:HomeData})
        this.getCommit()
        this.initStart()
    },

    deleteCommit(e) {
    wx.$fetch({url:`/commit/deleteCommit/${e.currentTarget.dataset.commitid}`,loading: true})
    .then(res => {
        if (res === 1) {
            setTimeout(() => {
                wx.showToast({
                title: '删除成功',
                icon:'success',
                duration:1300
                })
            },300)
            setTimeout(() => {
                this.getCommit()
            },1200)
            } else {
            wx.showToast({
                title: '删除失败',
                icon:'none',
                duration:1500
            })
            }
        })
    },

    submitMark() {
        const {myScore,item,userInfo,score} = this.data
        const data = {
            baseID: item.menuID,
            score: myScore.score,
            userID: userInfo.id,
            markType: 'menu'
        }
        console.log(data)
        wx.$fetch({url:'/mark/addMark',method:'POST',data:JSON.stringify(data),loading:true})
        .then(res => {
            if (res === 1) {
                wx.showToast({
                  title: '提交成功',
                  duration:1200
                })
                score.mainScore = ((parseFloat(score.mainScore * score.people) + parseFloat(myScore.score)) / (score.people + 1)).toFixed(1)
                score.people = score.people + 1;
                score.start = Math.floor(score.mainScore)
                this.setData({score,showSubmit:false})
            } else {
                wx.showToast({
                    title: '提交失败',
                    duration:1200,
                    icon:'none'
                  })
            }
        })
    },

    changeContent(e) {
        const {submitCommit} = this.data
        submitCommit.content = e.detail.value
        this.setData({submitCommit})
    },
    
    initStart() {
        const {score,myScore,item,userInfo} = this.data
        wx.$fetch({url:`/mark/getMainScoreByBaseID/${item.menuID}/menu`})
        .then(res => {
            console.log(res)
            if (!!res.count) {
                score.mainScore = res.score.toFixed(1)
                score.people = res.count
                score.start = Math.floor(res.score)
                this.setData({score})
            }
        })
        if (!!userInfo.id) {
            wx.$fetch({url:`/mark/selectUserMark/${userInfo.id}/${item.menuID}/menu`})
            .then(res => {
                if (res.length > 0) {
                    myScore.score = res[0].score
                    myScore.start = Math.floor(myScore.score)
                    this.setData({myScore})
                } else {
                    this.setData({showSubmit:true})
                }
            })
        }
    },
    reStorage(res) {
        const newJson = []
        res.map(e => {
          e.commitTime = wx.$utils.transTimePassed(e.commitTime)
          if (e.baseID === e.fatherID) {
            e.commit = []
            newJson.push(e)
          } else {
            const index = newJson.findIndex(x => x.id === e.fatherID)
            index !== -1 ? newJson[index].commit.push(e) : null
          }
        })
        newJson.sort(e => -1)
        this.setData({commit:newJson})
        // console.log(newJson)
    },

    getCommit() {
        const {item} = this.data
        wx.$fetch({
          url:`/commit/selectCommitByBaseID/${item.menuID}/menu`,
          loading:true
        }).then(res => {
          this.reStorage(res)
        })
    },

    secondCommit(e) {
        const {item} = e.currentTarget.dataset
        let {submitCommit} = this.data
        submitCommit = {...submitCommit,fatherID:item.id,fatherUserName:item.userName}
        this.setData({focus:true,submitCommit})
    },
    
    bindblur() {
        console.log("失去焦点")
        let {submitCommit} = this.data
        submitCommit = {...submitCommit,fatherID:submitCommit.baseID,fatherUserName:null}
        this.setData({submitCommit})
    },

    submit() {
        let {submitCommit} = this.data
        console.log(submitCommit)
        submitCommit.commitTime = String(new Date().getTime())
        if (!!submitCommit.content) {
          wx.$fetch({
            url:`/commit/addCommit`,
            method:'POST',
            loading:true,
            data:JSON.stringify(submitCommit)
          }).then(res => {
            if (res === 1) {
              submitCommit = {...submitCommit,fatherID:submitCommit.baseID,fatherUserName:null,content:null}
              this.setData({submitCommit})
              this.getCommit()
            } else {
              wx.showToast({
                title: '发送失败',
                icon:'none'
              })
            }
          })
        }
    },
    changeStar(e) {
        console.log(e.currentTarget.dataset)
        let {myScore,showSubmit} = this.data
        if (!showSubmit) return
        const {index,type} = e.currentTarget.dataset
        if (type === "sub") {
            myScore = {
                score: parseFloat(index + 1),
                start: index + 1
            }
        } else {
            myScore = {
                score: parseFloat(myScore.score + index + 1),
                start: myScore.start + index + 1
            }
        }
        this.setData({myScore})
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