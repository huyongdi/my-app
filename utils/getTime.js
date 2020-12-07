function getHourMin(fromTime) { // 2020-12-01T16:33+08:00
	let str = new Date(+new Date(fromTime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(
		/\.[\d]{3}Z/, '')
	return str.split(' ')[1].substring(0, 5)
}
export {
	getHourMin
}
