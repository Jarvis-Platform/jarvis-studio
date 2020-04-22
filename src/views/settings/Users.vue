<template>
	<div>
		<v-toolbar dense tabs color="primary">
			<v-toolbar-title class="pl-2 display-1">Users</v-toolbar-title>
		</v-toolbar>

		<users-content />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UsersContent from '@/components/settings/UsersContent.vue';

@Component({
	components: { UsersContent },
})
export default class Users extends Vue {}
</script>
