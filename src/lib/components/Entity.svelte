<script lang="ts">
	import Snapshot from '$lib/components/Snapshot.svelte';

	export let name: string;
    export let className: string;
</script>

<div class="card shadow-lg bg-base-100 { className }">
	<div class="flex-row items-center space-x-4 card-body">
		<div>
			<h2 class="my-4 text-4xl font-bold card-title">{name}</h2>
			<Snapshot time="Before Collision" />
			<Snapshot time="After Collision" />
		</div>
	</div>
</div>
