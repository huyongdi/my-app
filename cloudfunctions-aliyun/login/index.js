'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log(event)
	const collection = db.collection('uni-id-users')
	const {
		username,
		password
	} = event
	const res = await collection.where({
		username,
		password
	}).count()

	if (!res.total) {
		return {
			status: 500,
			msg: '用户名或密码错误！'
		}
	} else {
		return {
			status: 200,
			msg: '登录成功！'
		}
	}
};
