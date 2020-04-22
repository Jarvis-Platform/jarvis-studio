<template>
	<div>
		<v-toolbar dense tabs color="primary">
			<v-toolbar-title class="pl-2 display-1">Accounts</v-toolbar-title>
		</v-toolbar>

		<accounts-content />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AccountsContent from '@/components/settings/AccountsContent.vue';

@Component({
	components: { AccountsContent },
})
export default class Accounts extends Vue {}
</script>
