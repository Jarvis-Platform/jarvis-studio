const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { integrify } = require('integrify');

const listUsersHandler = require('./handlers/list-users');
const createUserHandler = require('./handlers/create-user');
const updateUserHandler = require('./handlers/update-user');
const deleteUserHandler = require('./handlers/delete-user');

admin.initializeApp();
integrify({ config: { functions, db: admin.firestore() } });

exports.listUsers = functions.https.onCall((data, context) => listUsersHandler(data, context));
exports.createUser = functions.https.onCall((data, context) => createUserHandler(data, context));
exports.updateUser = functions.https.onCall((data, context) => updateUserHandler(data, context));
exports.deleteUser = functions.https.onCall((data, context) => deleteUserHandler(data, context));

exports.deleteThreadNotes = integrify({
	rule: 'DELETE_REFERENCES',
	source: {
		collection: 'notes'
	},
	targets: [
		{
			collection: 'notes',
			foreignKey: 'parentNoteId'
		}
	]
});

// module.exports.replicateMasterToDetail = integrify({
// 	rule: 'REPLICATE_ATTRIBUTES',
// 	source: {
// 		collection: 'user'
// 	},
// 	targets: [
// 		{
// 			collection: 'notes',
// 			compositeKey: new Map([['userId', 'userId']]),
// 			attributeMapping: new Map([
// 				['email', 'email'],
// 				['photoURL', 'photoURL'],
// 				['fullName', 'displayName']
// 			])
// 		}
// 	],
// 	// TODO: Add module name in hook
// 	hooks: {
// 		pre: (snap, context) => {
// 			// Code to execute before deleting references
// 			// See: https://firebase.google.com/docs/functions/firestore-events
// 		}
// 	}
// });

exports.replicateUserAttributes = integrify({
	rule: 'REPLICATE_ATTRIBUTES',
	source: {
		collection: 'users'
	},
	targets: [
		{
			collection: 'notes',
			foreignKey: 'userId',
			attributeMapping: {
				email: 'userEmail',
				photoURL: 'userPhotoURL',
				displayName: 'userDisplayName'
			}
		}
	]
});
