<script lang="ts">
	import Snapshot from '$lib/components/Snapshot.svelte';
	import type { collision_object } from '$lib/ts/solver';

	export let name: string;
	export let className: string;
	export let data: collision_object;
</script>

<div class="card shadow-lg bg-base-100 {className}">
	<div class="flex-row items-center space-x-4 card-body">
		<div>
			<h2 class="my-4 text-4xl font-bold card-title">{name}</h2>
			<Snapshot bind:state={data.before} time="Before Collision" />
			<Snapshot bind:state={data.after} time="After Collision" />
		</div>
	</div>
</div>
