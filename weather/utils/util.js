const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

let formatDate = (nDate, date) => {
	if (isNaN(nDate.getTime())) {
		// 不是时间格式
		return '--'
	}
	let o = {
		'M+': nDate.getMonth() + 1,
		'd+': nDate.getDate(),
		'h+': nDate.getHours(),
		'm+': nDate.getMinutes(),
		's+': nDate.getSeconds(),
		// 季度
		'q+': Math.floor((nDate.getMonth() + 3) / 3),
		'S': nDate.getMilliseconds()
	}
	if (/(y+)/.test(date)) {
		date = date.replace(RegExp.$1, (nDate.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	for (let k in o) {
		if (new RegExp('(' + k + ')').test(date)) {
			date = date.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
		}
	}
	return date
}

const isEmptyObject = (obj)=>{
  for (let i in obj){
    return false
  }
  return true
}
module.exports = {
  formatTime: formatTime,
  formatDate,
  isEmptyObject
}
