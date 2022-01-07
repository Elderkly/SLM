function formatData(time) {
    const data = new Date(parseInt(time))
    const [year,mon,day] = [
        data.getFullYear(),
        data.getMonth() + 1,
        data.getDate()
    ]
    return year + '-' + mon + '-' + day
}

function login() {
    return new Promise((resolve,reject) => {
        // wx.getSetting({
        //     success (res){
        //       if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: function(user) {
                    console.log(user.userInfo)
                    wx.login({
                      success (res) {
                        if (res.code) {
                          wx.$fetch({url:`/user/login/${res.code}/${user.userInfo.nickName}`,loading:true})
                          .then(res => {
                            // console.log('登录',res)
                            if (res.userInfo && res.userInfo.id) {
                              console.log('查询到用户数据',res.userInfo)
                              resolve(res.userInfo)
                              wx.$storage.setStorage('UserInfo', JSON.stringify(res.userInfo))
                            } else {
                                reject()
                              wx.showToast({
                                title: "登录失败",
                                icon:'none'
                              })
                            }
                          })
                        } else {
                          console.log('登录失败！' + res.errMsg)
                          reject()
                          wx.showToast({
                            title: res.errMsg,
                            icon:'none'
                          })
                        }
                      }
                    })
                  }
                })
            //   } else {
            //     wx.showToast({
            //         title: '需获取用户基础信息才可正常使用',
            //         icon:'none'
            //     })
            //     reject()
            //   }
        //     }
        // })    
    })
}

async function getUserID() {
    const UserInfo = wx.$storage.getStorage('UserInfo')
    console.log('getUserID（）获取用户信息',UserInfo)
    if (!!UserInfo && !!UserInfo.id) {
        return UserInfo.id
    } else {
        const userInfo = await login()
        return userInfo && userInfo.id ? userInfo.id : false
    }
}

function getCalorie(userInfo) {
  const {height,weight,age} = userInfo 
  const Kcal = (665 + 3.6 * weight + 1.5 * height + 4.7 * age) * 1.2                     
  return Kcal.toFixed(2)    
}

export {
    formatData,
    login,
    getUserID,
    getCalorie
}