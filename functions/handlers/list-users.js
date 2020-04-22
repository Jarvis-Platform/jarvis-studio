const admin = require('firebase-admin');

module.exports = (data, context) => {
	// check request is made by an admin
	// if (context.auth.token.studioRoles.superAdmin !== true) {
	//   return { error: "only super admin can get all users list!" };
	// }

	return admin
		.auth()
		.listUsers(1000, data.nextPageToken)
		.then((users) => {
			// if (listUsersResult.pageToken) {
			//   // List next batch of users.
			//   listAllUsers(listUsersResult.pageToken);
			// }
			return users;
		})
		.catch((err) => err);
};
