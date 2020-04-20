<template>
	<div>
		<v-chip v-for="account in properties.accounts" :key="account" class="mr-2 mb-2">{{ account }}</v-chip>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AccountId } from '@/types';

@Component
export default class ProfileAccounts extends Vue {
	@Prop({ type: Object, required: true }) properties!: { accounts: AccountId[] };
}
</script>
