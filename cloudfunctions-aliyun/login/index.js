'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('uni-id-users')
	const {
		username,
		password
	} = event
	const res = await collection.where({
		username,
		password
	}).get()
	if (res.affectedDocs === 0) {
		return {
			status: 500,
			msg: '用户名或密码错误！'
		}
	} else {
		return {
			status: 200,
			data: res.data[0]
		}
	}
};
