'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('book-shelf')
	const res = await collection.where({
		userId: event.userId,
		bookName: event.bookName,
		author: event.author
	}).count()
	if (res.total) {
		return {
			status: 500,
			msg: '书籍已存在！'
		}
	}
	let res2 = await collection.add(event)
	return res2
};
