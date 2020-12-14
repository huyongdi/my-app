'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('book-shelf')
	const res = await collection.where({
		userId: event.userId,
		_id: event.bookId
	}).remove()
	if (res.deleted === 1) {
		return '删除成功'
	} else {
		return '删除失败'
	}
};
