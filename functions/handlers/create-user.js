const admin = require('firebase-admin');

module.exports = (data, context) => {
	// check request is made by an superAdmin
	// if (
	//   context.auth.token.studioRoles < 5 ||
	//   context.auth.token.studioRoles === undefined
	// ) {
	//   return { error: "only super admin can add roles and accounts to user!" };
	// }

	return admin
		.auth()
		.createUser({
			email: data.email,
			emailVerified: false,
			password: data.password,
			displayName: data.displayName,
			photoURL: data.photoURL,
			disabled: false,
		})
		.then((user) => {
			return { data: user };
		})
		.catch((error) => error);
};
