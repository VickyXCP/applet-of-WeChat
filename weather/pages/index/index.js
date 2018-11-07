let utils = require('../../utils/util.js')
let globalData = getApp().globalData
const key = globalData.key
let SYSTEMINFO = globalData.systemInfo

Page({
  /**
   * 页面的初始数据
   */
  data: {
    message: '',
    cityDatas: null,
    hourlyDatas: null,
    weatherIconUrl: globalData.weatherIconUrl,
    detailsDic: {
      key: ['tmp', 'fl', 'hum', 'pcpn', 'wind_dir', 'wind_deg', 'wind_sc', 'wind_spd', 'vis', 'pres', 'cloud'],
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
        cloud: '云量'
      }
    },
    lifesStyles: {
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
      'spi': '防晒指数'
    },
    searchText: '', //用来绑定搜索框的值
    hasPoped: false, //是否已经弹出
    animationMain: {},
    animationOne: {},
    animationTwo: {},
    animationThree: {},
    located: true, //是否是本地地址
    searchCity: '', //要查询的城市
    setting: {},
    bgcImgList: [{
        src: '/img/beach-bird-birds-235787.jpg',
        topColor: '#393836'
      },
      {
        src: '/img/clouds-forest-idyllic-417102.jpg',
        topColor: '#0085e5'
      },
      {
        src: '/img/backlit-dawn-dusk-327466.jpg',
        topColor: '#2d2225'
      },
      {
        src: '/img/accomplishment-adventure-clear-sky-585825.jpg',
        topColor: '#004a89'
      },
      {
        src: '/img/fog-himalayas-landscape-38326.jpg',
        topColor: '#b8bab9'
      },
      {
        src: '/img/asphalt-blue-sky-clouds-490411.jpg',
        topColor: '#009ffe'
      },
      {
        src: '/img/aerial-climate-cold-296559.jpg',
        topColor: '#d6d1e6'
      },
      {
        src: '/img/beautiful-cold-dawn-547115.jpg',
        topColor: '#ffa5bc'
      }
    ],
    bgcImgIndex: 0,
    bgcImg: '',
    bgcImgAreaShow: false,
    bgcColor: "#2d2225",
    openSettingButtonShow: false,
    shareInfo: {}
  },
  success(data, location) {
    this.setData({
      openSettingButtonShow: false,
      searchCity: location
    })
		wx.stopPullDownRefresh()
		let now = new Date()
		data.updateTime = now.getTime()
		date.updateTimeFormat = utils.formatDate(now, 'MM-dd hh:mm')
		wx.setStorage({
			key: 'cityDatas',
			data
		})
		this.setData({
			cityDatas: data
		})
  },
	fail(res){
		wx.stopPullDownRefresh()
		let errMsg = res.errMsg || ''
		// Deny authorization of geographic location
	},
  onLoad: function(options) {
    //  生命周期函数--监听页面加载
  },
  onReady: function() {
    //生命周期函数--监听页面初次渲染完成
  },
  onShow: function() {
    // 生命周期函数--监听页面显示
  },
  onHide: function() {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function() {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
  }
})