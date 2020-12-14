'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('uni-id-users')
	console.log(event)
	let res = await collection.doc(event.id).update({
		signature: event.signature
	});
	return res
};
