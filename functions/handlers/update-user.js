const admin = require('firebase-admin');

const applyValue = (key, data, user) => {
	const dataValue = data[key];
	const userValue = user[key];

	if (typeof dataValue === 'undefined' || dataValue === null) return userValue;
	return dataValue;
};

module.exports = (data, context) => {
	// check request is made by an superAdmin
	// if (
	//   context.auth.token.studioRoles < 5 ||
	//   context.auth.token.studioRoles === undefined
	// ) {
	//   return { error: "only super admin can add roles and accounts to user!" };
	// }

	// get user and add Tailer roles and accounts in custom claim
	admin
		.auth()
		.getUserByEmail(data.email)
		.then((user) => {
			admin.auth().updateUser(user.uid, {
				email: applyValue('email', data, user),
				disabled: applyValue('disabled', data, user),
				displayName: applyValue('displayName', data, user),
				photoURL: applyValue('photoURL', data, user),
			});

			admin.auth().setCustomUserClaims(user.uid, {
				studioRoles: data.studioRoles,
				accounts: data.accounts,
			});

			return {
				message: `Success! Accounts and roles have been  added to ${data.email}.`,
			};
		})
		.catch((err) => {
			return err;
		});
};
