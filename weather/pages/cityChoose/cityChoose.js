let staticData = require('../../data/staticData.js')
let utils = require('../../utils/util.js')

Page({
	data: {
		alternative: null,//是否可选择
		cities: [],//所有城市列表
		inputText: '',//搜索内容,
		showItems: null,//需要显示的城市(根据搜索内容匹配)
		hotCities: [],//热门城市
	},
	// 取消搜索
	cancel(){
		this.setData({
			inputText: '',
			showItems: this.data.cities
		})
	},
	// 对搜索内容进场过滤
	inputFilter(e){
		let alternative = {}
		let cities = this.data.cities
		let value = e.detail.value.replace(/\s+/g, '')
		if(value.length){
			for(let i in cities){
				let items = cities[i]
				for(let j=0;j<items.length;j++){
					let item = items[j]
					if(item.name.indexOf(value) !== -1){
						if(utils.isEmptyObject(alternative[i])){
							alternative[i] = []
						}
						alternative[i].push(item)
					}
				}
			}
			if(utils.isEmptyObject(alternative)){
				alternative = null
			}
			this.setData({
				alternative,
				showItems: alternative
			})
		}else{
			this.setData({
				alternative: null,
				showItems: cities
			})
		}
	},
	inputFilter1(e){
		let value = e.detail.value.replace(/\s+/g, '')
		let cities = this.data.cities
		let alternative = {}
		if(value.length){
			for (let i in cities) {
				let items = cities[i]
				for (let j = 0; j < items.length; j++) {
					let item = items[j]					
					if(item.name.indexOf(value)!==-1){
						if (utils.isEmptyObject(alternative[i])) {
							alternative[i] = []
						}
						alternative[i].push(item)
					}
				}
			}
			if (utils.isEmptyObject(alternative)) {
				alternative = null
			}
			this.setData({
				alternative,
				showItems: alternative
			})
			console.log(alternative)
		}else{
			this.setData({
				alternative: null,
				showItems: cities
			})
		}
	},
	// 获取以字母顺序排列的城市列表
	getSortedAreaObj(areas){
		areas = areas.sort((a, b)=>{
			if(a.letter>b.letter){
				return 1
			}
			if(a.letter<b.letter){
				return -1
			}
			return 0
		})
		let obj = {}
		for(let i=0;i<areas.length;i++){
			let item = areas[i]
			// delete item.districts
			let letter = item.letter
			if(!obj[letter]){
				obj[letter]=[]
			}
			obj[letter].push(item)
		}
		return obj
	},
	// 选择具体城市时触发
	choose(e) {
		let name = e.currentTarget.dataset.name
		let pages = getCurrentPages()
		let len = pages.length
		let indexPage = pages[len - 2]
		if (name) {
			indexPage.search(name, () => {
				wx.navigateBack({})
			})
		} else {
			indexPage.init({}, () => {
				wx.navigateBack({})
			})
		}
	},
	// 点击定位按钮触发
	back(){
		let pages = getCurrentPages()
		let len = pages.length
		let indexPage = pages[len - 2]
		indexPage.init({},()=>{
			wx.navigateBack({})
		})
	},
	// 加载数据
	onLoad(){
		let cities = this.getSortedAreaObj(staticData.cities || [])
		this.setData({
			cities,
			showItems: cities
		})
	}
})