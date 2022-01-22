<script lang="ts">
	import Katex from '$lib/components/Katex.svelte';
	import type { latex } from '$lib/ts/solver';

	export let name: string;
	export let units: string;
	export let input: latex = '';
</script>

<div class="flex">
	<label class="input-group py-1">
		<span class="w-28">{name}</span>
		<input
			type="text"
			placeholder="0"
			bind:value={input}
			class="input input-bordered mr-2 bg-base-100 focus:bg-base-100 {!input ? 'bg-error' : ''}"
		/>
	</label>
	<Katex math={units} />
</div>
