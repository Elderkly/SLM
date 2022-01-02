import * as config from './config'
export default function({url,loading,method="GET",data=null}) {
  return new Promise((resolve,reject) => {
    if (loading) {
      wx.showLoading({
        title: '加载中',
      })  
    }
    wx.request({
      url: `${config.default.url}${url}`, //仅为示例，并非真实的接口地址
      method:method,
      // dataType:'json',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:data,
      success: (res) => {
        return resolve(res.data)
      },
      complete: () => {
        if (loading) {
          setTimeout(function () {
            wx.hideLoading()
          }, 300)
        }
      }
    })
  })
}