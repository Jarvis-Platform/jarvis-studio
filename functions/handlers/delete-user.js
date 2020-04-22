const admin = require('firebase-admin');

module.exports = (data, context) => {
	// check request is made by an superAdmin
	// if (
	//   context.auth.token.studioRoles < 5 ||
	//   context.auth.token.studioRoles === undefined
	// ) {
	//   return { error: "only super admin can add roles and accounts to user!" };
	// }

	// get user and add Jarvis roles and accounts in custom claim
	return admin
		.auth()
		.getUserByEmail(data.email)
		.then((user) => admin.auth().deleteUser(user.uid))
		.then(() => {
			return {
				message: `${data.email} has been deleted`,
			};
		})
		.catch((err) => {
			return err;
		});
};
