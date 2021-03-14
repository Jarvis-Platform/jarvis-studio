/* prettier-ignore */

export const magicBell = (userEmail) => {
	(function (i, s, o, g, r, a, m) {
		i['MagicBellObject'] = r;
		(i[r] =
			i[r] ||
			function () {
				(i[r].q = i[r].q || []).push(arguments);
			}),
		(i[r].l = 1 * new Date());
		(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
		a.async = 1;
		a.src = g;
		m.parentNode.insertBefore(a, m);
	})(window, document, 'script', 'https://assets.magicbell.io/magicbell.min.js', 'magicbell');

	console.log(userEmail);
	const target = document.getElementById('notifications-inbox');
	const options = {
		apiKey: process.env.VUE_APP_MAGIC_BELL_API_KEY,
		userEmail,
		onNotificationClick: function (notification) {
			if (notification.actionUrl) window.open(notification.actionUrl, '_self');
		},
		height: 500,
		theme: {
			icon: {borderColor: '#FFFFFF', width: '24px'},
			unseenBadge: {backgroundColor: '#DF4759'},
			header: {backgroundColor: '#012738', textColor: '#ffffff', borderRadius: '16px'},
			footer: {backgroundColor: '#012738', textColor: '#ffffff', borderRadius: '16px'},
			notification: {
				default: {textColor: '#15091F', borderRadius: '8px', backgroundColor: '#012738'},
				unseen: {backgroundColor: '#012738'},
				unread: {backgroundColor: '#012738'},
			},
		},
	};

	magicbell('render', target, options);
};
