import { LOGOUT, PROFILE } from '@/constants/router/routes-names';

export type UserSetting = {
	title: string;
	link: {
		name: string;
	};
	icon: string;
};

export const userSettings: UserSetting[] = [
	{
		title: 'Profile',
		link: { name: PROFILE },
		icon: 'account_circle',
	},
	{
		title: 'Logout',
		link: { name: LOGOUT },
		icon: 'exit_to_app',
	},
];
