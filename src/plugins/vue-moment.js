// NE MARCHE PAS
import Vue from 'vue';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';

Vue.use(VueMoment, {
	moment,
});

export default new VueMoment();
