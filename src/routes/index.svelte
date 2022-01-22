<script lang="ts">
	import Entity from '$lib/components/Entity.svelte';
	import { solveState, solveCollision, collisionObjectFactory } from '$lib/ts/solver';
	import type { collision_object } from '$lib/ts/solver';

	let obj1: collision_object = collisionObjectFactory();
	let obj2: collision_object = collisionObjectFactory();

	function solveBothStates(obj1: collision_object): collision_object {
		solveState(obj1.before);
		solveState(obj1.after);
		return obj1
	}

	$: {
		solveBothStates(obj1);
		solveBothStates(obj2);
	}
</script>

<Entity className="col-span-1 xl:col-start-2 xl:col-span-4" name="Object 1" bind:data={obj1} />
<Entity className="col-span-1 xl:col-start-6 xl:col-span-4" name="Object 2" bind:data={obj2} />

<div class="col-span-1 xl:col-span-8 xl:col-start-2">
	<div class="card shadow-lg bg-base-100">
		<div class="flex-row items-center space-x-4 card-body">
			<button class="btn" on:click={() => {obj1 = collisionObjectFactory(); obj2 = collisionObjectFactory();}}>Clear</button> 
		</div>
	</div>
</div>