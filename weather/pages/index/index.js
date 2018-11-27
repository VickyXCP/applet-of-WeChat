let utils = require('../../utils/util.js')
let globalData = getApp().globalData
const key = globalData.key
let SYSTEMINFO = globalData.systemInfo

Page({
  data:{
		message: '',
		located: true,//表示是否显示当前所在城市
		searchCity: '',//当前搜索城市
		cityDatas: {},//当前城市的相关信息,包括天气信息以及更新时间等等
		weatherIconUrl:globalData.weatherIconUrl,//天气图片的路径
		// 本日详细天气指数
		detailsDic: {
			key: ['tmp', 'fl', 'hum', 'pcpn', 'wind_dir', 'wind_deg', 'wind_sc', 'wind_spd', 'vis', 'pres', 'cloud', ''],
			val: {
				tmp: '温度(℃)',
				fl: '体感温度(℃)',
				hum: '相对湿度(%)',
				pcpn: '降水量(mm)',
				wind_dir: '风向',
				wind_deg: '风向角度(deg)',
				wind_sc: '风力(级)',
				wind_spd: '风速(mk/h)',
				vis: '能见度(km)',
				pres: '气压(mb)',
				cloud: '云量',
			},
		},
		lifestyles: {
			'comf': '舒适度指数',
			'cw': '洗车指数',
			'drsg': '穿衣指数',
			'flu': '感冒指数',
			'sport': '运动指数',
			'trav': '旅游指数',
			'uv': '紫外线指数',
			'air': '空气污染扩散条件指数',
			'ac': '空调开启指数',
			'ag': '过敏指数',
			'gl': '太阳镜指数',
			'mu': '化妆指数',
			'airc': '晾晒指数',
			'ptfc': '交通指数',
			'fsh': '钓鱼指数',
			'spi': '防晒指数',
		},
	},
	// 公共调用函数success，fail
	success(data, location){
		this.setData({
			searchCity: location
		})
		// 停止当前页面下拉刷新
		wx.stopPullDownRefresh()
		let now = new Date()
		data.updateTime = now.getTime()
		data.updateTimeFormat = utils.formatDate(now, "MM-dd hh:mm")
		wx.setStorage({
			key: 'cityDatas',
			data
		})
		this.setData({
			cityDatas: data
		})
		console.log(this.data.cityDatas)
	},
	fail(res){
		wx.stopPullDownRefresh()
		let errMsg = res.errMsg || ''
		if(errMsg.indexOf('deny') !== -1 || errMsg.indexOf('denied') !== -1){
			wx.showToast({
				title: '需要开启地理位置权限',
				icon: 'none',
				duration: 2500,//提示延迟时间
				success: (res)=>{

				}
			})
		}else{
			wx.showToast({
				title: '网络不给力，请稍后再试',
				icon: 'none'
			})
		}
	},
	// 初始化页面
	init(params, callback){
		this.setData({
			located: true
		})
		// 获取当前的地理位置、速度
		wx.getLocation({
			success: (res) => {
				this.getWeather(`${res.latitude},${res.longitude}`)
				callback && callback
			},
			fail: (res)=>{
				this.fail(res)
			}
		})
	},
	// 获取天气信息
	getWeather(location){
		wx.request({
			url: `${globalData.requestUrl.weather}`,
			data: {
				location,//经纬度
				key//和风天气的认证key
			},
			success: (res)=>{
				if (res.statusCode === 200) {
					let data = res.data.HeWeather6[0]
					if (data.status === 'ok') {
						this.success(data, location)
					}else{
						wx.showToast({
							title: '查询失败',
							icon: 'none'
						})
					}
				}
			},
			fail: ()=>{
				// 显示消息提示框
				wx.showToast({
					title: '查询失败',
					icon: 'none'
				})
			}
		})
	},
	// 重新加载天气
	reloadWeather(){
		if(this.data.located){
			this.init({})
		}else{

		}
	},
	// 重新加载页面
	reloadPage(){
		this.reloadWeather()
	},
	// 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数
	onLoad(){
		this.reloadPage()
	}
})