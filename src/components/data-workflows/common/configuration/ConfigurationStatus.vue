<template>
	<div>
		<v-chip
			:color="color"
			text-color="white"
			:small="isSmall"
			:class="{
				'text-uppercase': isLabel,
				'text-capitalize': !isLabel,
				'no-opacity': this.item.archived,
			}"
			:label="isLabel"
			:disabled="item.archived"
			@click="changeActivatedStatus(item, collection)"
		>
			<v-progress-circular indeterminate size="20" color="primary" v-if="isLoading" />
			<span v-else>{{ label }}</span>
		</v-chip>

		<v-snackbar v-model="snackbarParam.isVisible" :color="snackbarParam.color" :timeout="timeout">
			{{ snackbarParam.text }}
			<v-btn text @click="closeSnackbar">Close</v-btn>
		</v-snackbar>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getActiveConfColor, getActiveConfLabel } from '@/util/data-workflows/configuration';
import { AnyObject, Snackbar } from '@/types';

import { SNACKBAR } from '@/constants/ui/snackbar';

@Component
export default class ConfigurationStatus extends Vue {
	@Prop({ type: Object, required: true }) item!: AnyObject;
	@Prop({ type: String, required: true }) collection!: string;
	@Prop({ type: Boolean, default: undefined }) isActivated: boolean | undefined;
	@Prop({ type: Boolean, default: true }) isSmall!: boolean;
	@Prop({ type: Boolean, default: false }) isLabel!: boolean;

	isLoading: boolean = false;
	snackbarParam: Snackbar = {
		isVisible: false,
		text: '',
		timeout: SNACKBAR.TIMEOUT,
		color: '',
	};

	changeActivatedStatus(item: AnyObject, collection: string) {
		if (this.isActivated === undefined) {
			this.statusUpdateCallback({
				isVisible: true,
				text: 'The Activated attribute is not well set in the source configuration. Please update and deploy it again',
				timeout: SNACKBAR.TIMEOUT,
				color: 'error',
			});

			return;
		}

		this.isLoading = true;
		this.snackbarParam = {
			isVisible: false,
			text: '',
			timeout: SNACKBAR.TIMEOUT,
			color: '',
		};
		const id = item.id;
		const collectionPath = `${collection}/patch`;

		let activated: boolean, text: string;

		if (this.isActivated) {
			activated = false;
			text = 'Configuration disabled';
		} else {
			activated = true;
			text = 'Configuration activated';
		}

		this.$store.dispatch(collectionPath, { id, activated }).then(() => {
			this.statusUpdateCallback({
				isVisible: true,
				text,
				timeout: SNACKBAR.TIMEOUT,
				color: getActiveConfColor(activated, item.archived),
			});
		});
	}

	statusUpdateCallback(snackbarParams: Snackbar) {
		this.snackbarParam = snackbarParams;
		this.isLoading = false;
	}

	closeSnackbar() {
		this.snackbarParam.isVisible = false;
	}

	get color() {
		return getActiveConfColor(this.isActivated, this.item.archived);
	}

	get label() {
		return getActiveConfLabel(this.isActivated);
	}

	get timeout() {
		return 3500;
	}
}
</script>

<style lang="scss">
.v-chip.no-opacity {
	opacity: 1;
}
</style>
