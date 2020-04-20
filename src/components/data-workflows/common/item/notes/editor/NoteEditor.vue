<template>
	<v-container @keydown="handleCmdEnter($event)">
		<tiptap-vuetify v-model="text" :extensions="extensions" class="editor my-4" />
		<v-btn
			:loading="isLoading"
			:disabled="isSaveButtonDisabled"
			color="primary"
			class="float-right"
			@click="onValidated"
		>
			<v-icon>{{ icon }}</v-icon>
		</v-btn>
	</v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { User } from '@/types';
import { Getter } from 'vuex-class';
import { TiptapVuetify } from 'tiptap-vuetify';
import { mdiPencil, mdiSend } from '@mdi/js';

import extenstions from './extenstions';

@Component({
	components: { TiptapVuetify }
})
export default class NoteEditor extends Vue {
	@Prop(String) defaultText?: string;
	@Prop(Boolean) isEditing?: boolean;
	@Prop({ type: Boolean, required: true }) isLoading!: boolean;

	@Getter('user/user') user!: User;

	text = '';
	extensions = extenstions;

	mounted() {
		if (this.defaultText) this.text = this.defaultText;
	}

	handleCmdEnter(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.keyCode == 13) this.onValidated();
	}

	onValidated() {
		this.$emit('onValidated', this.text);
		this.text = '';
	}

	get isSaveButtonDisabled(): boolean {
		return this.isEditing ? this.text === this.defaultText : this.text.length <= 7;
	}

	get icon(): string {
		return this.isEditing ? mdiPencil : mdiSend;
	}
}
</script>

<style lang="scss">
.editor {
	p {
		outline: none;
		margin: 0;
	}

	.tiptap-vuetify-editor__content {
		padding: 24px 16px;

		.ProseMirror-focused {
			outline: none !important;
		}
	}
}
</style>
