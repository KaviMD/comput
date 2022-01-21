<script lang="ts">
	import Katex from '$lib/components/Katex.svelte';

	export let name: string;
	export let units: string;
	export let input = '';
	export let missing = false;
</script>

<div class="flex">
	<label class="input-group py-1">
		<span class="w-28">{name}</span>
		<input type="text" placeholder="0" bind:value={input} class="input input-bordered mr-2 bg-base-100 focus:bg-base-100 {missing ? 'bg-error' : ''}" />
	</label>
	<Katex math={units} />
</div>
