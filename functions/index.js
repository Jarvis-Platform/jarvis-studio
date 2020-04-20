const functions = require('firebase-functions');
const admin = require('firebase-admin');
const util = require('util');

const listUsersHandler = require('./handlers/list-users');
const createUserHandler = require('./handlers/create-user');
const updateUserHandler = require('./handlers/update-user');
const deleteUserHandler = require('./handlers/delete-user');

admin.initializeApp();

exports.listUsers = functions.https.onCall((data, context) => listUsersHandler(data, context));
exports.createUser = functions.https.onCall((data, context) => createUserHandler(data, context));
exports.updateUser = functions.https.onCall((data, context) => updateUserHandler(data, context));
exports.deleteUser = functions.https.onCall((data, context) => deleteUserHandler(data, context));

exports.replicateUser = functions.firestore.document('users/{userId}').onUpdate((change, context) => {
	const user = change.after.data();
	// const previousValue = change.before.data();

	const matchedNotes = admin
		.firestore()
		.collection('notes')
		.where('userId', '==', context.params.userId)
		.get()
		// eslint-disable-next-line promise/always-return
		.then(detailDocs => {
			detailDocs.forEach(detailDoc => {
				console.log(util.inspect(detailDoc));
			});
		});

	console.log(matchedNotes);
});
