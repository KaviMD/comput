<script lang="ts">
	import Entity from '$lib/components/Entity.svelte';
	import {
		collision_object_to_sympy,
		sympy_to_collision_object,
		collisionObjectFactory
	} from '$lib/ts/solver';
	import type { collision_object, latex } from '$lib/ts/solver';
	import MathInput from '$lib/components/mathinput.svelte';

	let obj1: collision_object = collisionObjectFactory();
	let obj2: collision_object = collisionObjectFactory();
	let relative_speed: latex = null;

	async function solve() {
		const req = JSON.stringify({
			problem_type: 'collision',
			problem: collision_object_to_sympy(obj1, obj2, relative_speed)
		});
		const collision_solution = await fetch('/api/physics', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: req
		});

		if (collision_solution.status !== 200) {
			console.error(
				'Error in collision_solution.status !== 200',
				collision_solution.status, await collision_solution.json(), JSON.parse(req)
			);
			return;
		}

		// console.log(req);
		const body = await collision_solution.json();
		const solution = sympy_to_collision_object(body);
		obj1 = solution.obj1;
		obj2 = solution.obj2;
		relative_speed = solution.relative_speed;
	}
</script>

<Entity className="col-span-1 xl:col-start-2 xl:col-span-4" name="Object 1" bind:data={obj1} />
<Entity className="col-span-1 xl:col-start-6 xl:col-span-4" name="Object 2" bind:data={obj2} />

<div class="col-span-1 xl:col-span-8 xl:col-start-2">
	<div class="card shadow-lg bg-base-100">
		<div class="flex-row items-center space-x-4 card-body">
			<MathInput name="COR" units="e" bind:input={relative_speed} />
			<button
				class="btn"
				on:click={() => {
					solve();
				}}>Solve</button
			>
			<button
				class="btn"
				on:click={() => {
					obj1 = collisionObjectFactory();
					obj2 = collisionObjectFactory();
					relative_speed = null;
				}}>Clear</button
			>
		</div>
	</div>
</div>
