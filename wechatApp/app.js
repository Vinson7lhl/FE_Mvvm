
//app.js
App({
  // 小程序初始化完时（只触发一次）
  onLaunch(options) {
    console.log('/*---app.js_onLaunch---*/')
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success(res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('wx.login-res',res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 打开小程序时触发
  onShow(options) {
    console.log('/*---app.js_onShow---*/');
  },
  // 当点击右上角-或者回到Home主界面的隐藏时触发
  onHide() {
    console.log('/*---app.js_onHide---*/');
  },
  onError(msg) {
    console.log('/*---app.js_onError---*/');
  },
  onPageNotFound() {
    console.log('/*---app.js_onPageNotFound---*/');
  },
  /*---app.js_onShow---*/
  globalData: {
    userInfo: null,
    globalNum: 0
  }
})