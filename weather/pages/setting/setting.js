let utils = require('../../utils/util.js')
// pages/setting/setting.js
Page({
  data: {
    setting: {}, //存储初始设置内容
    indexPage: {}, //显示主页
		SDKVersion: '',//当前微信的SDK版本
    enableUpdate: true, //是否可更新
    stayLight: false, //是否保持常亮
		screenBrightness: '获取中',//亮度
		show: false
  },
  // 切换状态
  switchChange(e) {
    let dataset = e.target.dataset
    let switchparam = dataset.switchparam
    let setting = this.data.setting
    if (switchparam === 'remindUpdate') {
      if (this.data.enableUpdate) {
        setting[switchparam] = (e.detail || {}).value
      } else {
        setting[switchparam] = false
        wx.showToast({
          title: '基础版本库较低，无法使用该功能',
          icon: 'none',
          duration: 2000
        })
      }
    } else if (switchparam === 'stayLight') {
      this.setKeepScreenOn(!this.data.stayLight)
			getApp().globalData.keepScreenOn = !this.data.stayLight
    } else{
			setting[switchparam] = !(e.detail || {}).value
		}
		this.setData({
			setting
		})
		wx.setStorage({
			key: 'setting',
			data: setting,
			success: ()=>{
				this.data.indexPage.reloadInitSetting()
			}
		})
  },
	// 页面显示，切入前台时触发
	onShow(){
		let pages = getCurrentPages()
		let len = pages.length
		let indexPage = pages[len-2]
		this.setData({
			stayLight: getApp().globalData.keepScreenOn,
			indexPage
		})
		this.ifDisabledUpdate()
		this.getScreenBrightness()
		wx.getStorage({
			key: 'setting',
			success: (res) => {
				let setting = res.data
				this.setData({
					setting
				})
			},
			fail: (res)=>{
				this.setData({
					setting: {}
				})
			}
		})
	},
	// 判断是否有新版本
	ifDisabledUpdate(){
		let systemInfo = getApp().globalData.systemInfo
		let SDKVersion = systemInfo.SDKVersion
		let version = utils.cmpVersion(SDKVersion, '1.9.90')
		if(version>= 0){
			this.setData({
				SDKVersion,
				enableUpdate: true
			})
		}else{
			this.setData({
				SDKVersion,
				enableUpdate: false
			})
		}
	},
	// 获取当前屏幕亮度
	getScreenBrightness(){
		wx.getScreenBrightness({
			success: (res)=>{
				console.log(res)
				this.setData({
					screenBrightness:res.value * 100
				})
				console.log(this.data.screenBrightness)						
			},
			fail:(e)=>{
				this.setData({
					screenBrightness: e
				})
			}
		})
	},
	// 设置当前屏幕亮度
	setScreenBrightness(val){
		wx.setScreenBrightness({
			value: val/100,
			success: (res)=>{
				this.setData({
					screenBrightness: val
				})
			}
		})
	},
	// 操作屏幕亮度
	screenBrightnessChange(e){
		this.setData({
			screenBrightness: e.detail.value
		})
	},
	// 设置屏幕常亮
  setKeepScreenOn(b) {
    wx.setKeepScreenOn({
      keepScreenOn: b,
      success: () => {
        this.setData({
					stayLight: b
        })
      }
    })
  },
	// 是否支持NFC
	getNFCState(){
		wx.showLoading({
			title: '检测中...',
			duration: 1000
		})
		wx.getHCEState({
			success: (res)=>{
				wx.hideLoading()
				wx.showModal({
					title: '检测结果',
					content: '该设备支持NFC功能',
					showCancel: false,
					confirmText: '朕知道了',
					confirmColor: '#40a7e7'
				})
			},
			fail: (res)=>{
				wx.hideLoading()
				wx.showModal({
					title: '检测结果',
					content: '该设备不支持NFC功能',
					showCancel: false,
					confirmText: '朕知道了',
					confirmColor: '#40a7e7'
				})
			}
		})
	},
	// 清楚缓存
	removeStorage(e){
		let datatype = e.target.dataset.type
		let that = this
		if(datatype==='setting'){
			wx.showModal({
				title: '提示',
				content: '确定要初始化设置吗？',
				confirmText: '容朕想想',
				confirmColor: '#40a7e7',
				success: (res)=>{
					if(res.confirm){
						wx.removeStorage({
							key: 'setting',
							success: function(res) {
								wx.showToast({
									title: '设置已初始化',
								})
								that.setData({
									setting: {}
								})
								that.data.indexPage.reloadInitSetting()
							},
						})
					}
				}
			})
		}else if(datatype === 'all'){
			wx.showModal({
				title: '提示',
				content: '确认要清除所以缓存吗？',
				confirmText: '容朕想想',
				confirmColor: '#40a7e7',
				success: (res)=>{
					if(res.confirm){
						wx.clearStorage({
							success: (res)=>{
								wx.showToast({
									title: '数据已清除',
								})
								that.setData({
									setting: {},
									pos: {}
								})
								that.data.indexPage.reloadInitSetting()
							}
						})
					}
				}
			})
		}
	},
	// 查看系统信息
	checkSystemInfo(){
		wx.navigateTo({
			url: '/pages/systeminfo/systeminfo',
		})
	},
	hide(){
		this.setData({
			show: false
		})
	},
	updateInstruc(){
		this.setData({
			show: true
		})
	}
})