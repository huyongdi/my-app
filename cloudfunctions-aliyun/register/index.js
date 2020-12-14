'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('uni-id-users')
	const res = await collection.where({
		username: event.username,
		password: event.password
	}).count()
	if (res.total) {
		return {
			status: 500,
			msg: '用户名已存在！'
		}
	}
	let res2 = await collection.add(event)
	return res2
};
