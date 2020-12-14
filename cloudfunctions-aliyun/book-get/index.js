'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('book-shelf')
	const res = await collection.where({
		userId: event.userId,
	}).get()
	if (res.affectedDocs === 0) {
		return '数据为空！'

	} else {
		return res.data
	}
};
