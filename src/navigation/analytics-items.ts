import { Link } from '@/types';
import {
	STORAGE_TO_STORAGE_RUNS_LISTING,
	STORAGE_TO_TABLES_RUNS_LISTING,
	TABLES_TO_TABLES_RUNS_LISTING,
	TABLE_TO_STORAGE_RUNS_LISTING,
	VM_LAUNCHER_RUNS_LISTING,
	WORKFLOW_STATUS_LISTING,
} from '@/constants/router/routes-names';

export const analyticsItems: Link[] = [
	{
		icon: 'flare',
		title: 'Storage to Storage',
		link: { name: STORAGE_TO_STORAGE_RUNS_LISTING },
	},
	{
		icon: 'post_add',
		title: 'Storage to Tables',
		link: { name: STORAGE_TO_TABLES_RUNS_LISTING },
	},
	{
		icon: 'account_tree',
		title: 'Tables to Tables',
		link: { name: TABLES_TO_TABLES_RUNS_LISTING },
	},
	{
		icon: 'share',
		title: 'Table to Storage',
		link: { name: TABLE_TO_STORAGE_RUNS_LISTING },
	},
	{
		icon: 'dns',
		title: 'VM Launcher',
		link: { name: VM_LAUNCHER_RUNS_LISTING },
	},
	{
		icon: 'power',
		title: 'Workflow',
		link: { name: WORKFLOW_STATUS_LISTING },
	},
];
