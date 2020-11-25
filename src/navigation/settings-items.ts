import { Link } from '@/types';
import { isSuperAdminRule } from '@/navigation/rules';
import { PROFILE, USERS, ACCOUNTS, CLOUD_FUNCTIONS, DASHBOARDS } from '@/constants/router/routes-names';

export const settingsItems: Link[] = [
	{
		title: 'Profile',
		icon: 'account_circle',
		link: { name: PROFILE },
	},
	{
		title: 'Users',
		icon: 'supervised_user_circle',
		link: { name: USERS },
		displayRule: isSuperAdminRule,
	},
	{
		title: 'Accounts',
		icon: 'business',
		link: { name: ACCOUNTS },
		displayRule: isSuperAdminRule,
	},
	{
		title: 'Dashboards',
		icon: 'dashboard',
		link: { name: DASHBOARDS },
		displayRule: isSuperAdminRule,
	},
	{
		title: 'Cloud Function Configurations',
		icon: 'settings_ethernet',
		link: { name: CLOUD_FUNCTIONS },
		displayRule: isSuperAdminRule,
	},
];
