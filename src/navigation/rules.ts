import store from '@/store';
import { SUPER_ADMIN } from '@/constants/user/roles';

export const isSuperAdminRule = () => store.getters['user/user'].studioRoles === SUPER_ADMIN.roleCode;
