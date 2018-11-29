// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
		hasSearch: true,//是否显示搜索城市框
		hasStyle: true, //是否显示各种生活指数
  },
	// 切换状态
	switchChange(e){
		let value = e.target.dataset.switchparam
		console.log(value)
		
	}
})