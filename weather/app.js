//app.js
App({
  onLaunch() {
    // 异步获取系统信息
    wx.getSystemInfo({
      success:(res)=>{
        this.globalData.systemInfo = res
      },
      fail: ()=>{},
      complete: ()=>{}
    })
  },
  globalData: {
    keepScreenOn: false,//是否保持屏幕常亮，离开小程序失效
    systemInfo: {},
    key: '780ee7cf2d7f4e08b054a78e037e51d4',//和风天气认证key
    weatherIconUrl: 'https://cdn.heweather.com/cond_icon/',
    requestUrl: {
      weather: 'https://free-api.heweather.com/s6/weather',
      hourly: 'https://free-api.heweather.com/s6/weather/hourly'
    }
  }
})