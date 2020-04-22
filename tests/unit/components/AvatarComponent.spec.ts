import Vue from 'vue';
import Vuetify from 'vuetify';
import AvatarComponent from '@/components/common/AvatarComponent.vue';
import { createLocalVue, mount, Wrapper } from '@vue/test-utils';

Vue.use(Vuetify);

describe('AvatarComponent.vue', () => {
	let vuetify: any;
	const localVue = createLocalVue();

	const initializeWrapper = (options?: object): Wrapper<AvatarComponent> => {
		return mount(AvatarComponent, {
			localVue,
			vuetify,
			propsData: {
				user: {
					email: 'user.name@gmail.com',
					photoUrl: 'https://fakelink.fr'
				}
			},
			...options
		});
	};

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	describe('size prop', () => {
		it('default', () => {});
		it('x-small', () => {});
		it('x-large', () => {});
	});

	describe('photoURL', () => {
		it('display photoURL as avatar', () => {});
	});

	describe('computed', () => {
		it('get user initials', () => {
			const wrapper = initializeWrapper();
			// TODO: Remove
			// @ts-ignore
			expect(wrapper.vm.initials).toBe('UN');
		});
	});
});
