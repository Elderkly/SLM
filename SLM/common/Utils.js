function formatData(time) {
    const data = new Date(parseInt(time))
    const [year,mon,day] = [
        data.getFullYear(),
        data.getMonth() + 1,
        data.getDate()
    ]
    return year + '-' + mon + '-' + day
}

/**
 * 发表时间转换 （多久以前发表的）
 * @export
 * @param {String} seconds 发表时间距离当前时间的秒数
 * @returns {String}} 转换后的文字描述
 * example1：65 => 1分钟前
 * example2：3622 => 1小时前
 */
function transTimePassed(postTime) {
  // seconds非0，且等于''或null或undefine时，则不显示
  if (!postTime) {
    return '';
  }
  const now = (new Date().getTime()) / 1000;
  const seconds = now - (Number(postTime)/1000);
  if (seconds <= 30) {
    return '刚刚发布';
  }
  if (seconds < 60) {
    return `${Math.floor(seconds)}秒前`;
  }
  const minutes = seconds / 60;
  if (minutes < 60) {
    return `${Math.floor(minutes)}分钟前`;
  };
  const hours = minutes / 60;
  if (hours < 24) {
    return `${Math.floor(hours)}小时前`;
  };
  const days = hours / 24;
  if (days <= 7) {
    return `${Math.floor(days)}天前`;
  };
  // const months = days / 30;
  if (days >= 7) {
    const jsTimestamp = new Date(Number(postTime));
    const year = jsTimestamp.getFullYear();
    const hour = jsTimestamp.getHours();
    const minute = jsTimestamp.getMinutes();
    const seconds = jsTimestamp.getSeconds();
    const currentYear = new Date().getFullYear();
    if (currentYear === year) {
      return `${jsTimestamp.getMonth() + 1}月${jsTimestamp.getDate()}日${hour}时${minute}分${seconds}秒`;
    }

    return `${year}年${jsTimestamp.getMonth() + 1}月${jsTimestamp.getDate()}日${hour}时${minute}分${seconds}秒`;
  }
  return '';
}

function login() {
    return new Promise((resolve,reject) => {
        wx.getUserInfo({
          success: function(user) {
            console.log(user.userInfo)
            wx.login({
              success (res) {
                if (res.code) {
                  const data = {
                    code:res.code,
                    nickName: user.userInfo.nickName,
                    userImg:user.userInfo.avatarUrl
                  }
                  wx.$fetch({url:`/user/login`,method:"POST",data:JSON.stringify(data),loading:true})
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
    getCalorie,
    transTimePassed
}