<script lang="ts">
	import Entity from '$lib/components/Entity.svelte';
	import {
		collision_object_to_sympy,
		sympy_to_collision_object,
		state_to_sympy,
		sympy_to_state,
		collisionObjectFactory
	} from '$lib/ts/solver';
	import type { collision_object, state, latex } from '$lib/ts/solver';
	import MathInput from '$lib/components/MathInput.svelte';

	let obj1: collision_object = collisionObjectFactory();
	let obj2: collision_object = collisionObjectFactory();
	let relative_speed: latex = null;
	let relative_speed_positive: boolean = true;
	let precision: number = 3;

	async function solve_state(s: state) {
		const req = JSON.stringify({
			problem_type: 'object_properties',
			problem: state_to_sympy(s),
			precision: precision
		});
		const state_solution = await fetch('/api/physics', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: req
		});

		if (state_solution.status !== 200) {
			console.error(
				'Error in state_solution.status !== 200',
				state_solution.status,
				await state_solution.json(),
				JSON.parse(req)
			);
			return s;
		}

		const body = await state_solution.json();
		const solution = sympy_to_state(body);
		return solution;
	}

	async function solve_collision(
		o1: collision_object,
		o2: collision_object,
		rs: latex,
		rs_sign: boolean
	) {
		const req = JSON.stringify({
			problem_type: 'collision',
			problem: collision_object_to_sympy(o1, o2, rs, rs_sign),
			precision: precision
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
				collision_solution.status,
				await collision_solution.json(),
				JSON.parse(req)
			);
			return {
				obj1: o1,
				obj2: o2,
				relative_speed: rs
			};
		}

		// console.log(req);
		const body = await collision_solution.json();
		return sympy_to_collision_object(body);
	}

	async function solve() {
		[obj1.before, obj1.after, obj2.before, obj2.after] = await Promise.all([
			solve_state(obj1.before),
			solve_state(obj1.after),
			solve_state(obj2.before),
			solve_state(obj2.after)
		]);

		({ obj1, obj2, relative_speed } = await solve_collision(
			obj1,
			obj2,
			relative_speed,
			relative_speed_positive
		));

		[obj1.before, obj1.after, obj2.before, obj2.after] = await Promise.all([
			solve_state(obj1.before),
			solve_state(obj1.after),
			solve_state(obj2.before),
			solve_state(obj2.after)
		]);
	}
</script>

<svelte:head>
	<title>COMPUT</title>
</svelte:head>

<Entity className="col-span-1 xl:col-start-2 xl:col-span-4" name="Object 1" bind:data={obj1} />
<Entity className="col-span-1 xl:col-start-6 xl:col-span-4" name="Object 2" bind:data={obj2} />

<div class="col-span-1 xl:col-span-8 xl:col-start-2">
	<div class="card shadow-lg bg-base-100">
		<div class="xl:flex-row items-center space-x-4 card-body">
			<MathInput name="COR" units="e" bind:input={relative_speed} />
			<h3 class="card-title !mt-3 !ml-10">Relative Speed Sign</h3>
			<div class="btn-group">
				<button
					class="btn {relative_speed_positive ? 'btn-active' : ''}"
					on:click={() => {
						relative_speed_positive = true;
					}}>+</button
				>
				<button
					class="btn {!relative_speed_positive ? 'btn-active' : ''}"
					on:click={() => {
						relative_speed_positive = false;
					}}>-</button
				>
			</div>

			<label class="input-group !w-min !ml-4 !mt-4 xl:!mt-0">
				<span>Precision</span>
				<input type="number" bind:value={precision} placeholder="3" class="input input-bordered" />
			</label>
		</div>
		<div class="flex-row items-center space-x-4 card-body !pt-0">
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
					relative_speed_positive = true;
				}}>Clear</button
			>
		</div>
		<div class="flex-row items-center space-x-4 card-body !pt-0">
			<div class="w-full shadow stats">
				<div class="stat">
					<div class="stat-title">Initial Kinetic Energy</div>
					<div class="stat-value">
						{Number(obj1.before.kinetic_energy) + Number(obj2.before.kinetic_energy)}
					</div>
				</div>
				<div class="stat">
					<div class="stat-title">Final Kinetic Energy</div>
					<div class="stat-value text-info">
						{Number(obj1.after.kinetic_energy) + Number(obj2.after.kinetic_energy)}
					</div>
				</div>
				<div class="stat">
					<div class="stat-title">Change in Kinetic Energy</div>
					<div class="stat-value text-primary">
						{Number(obj1.after.kinetic_energy) +
							Number(obj2.after.kinetic_energy) -
							(Number(obj1.before.kinetic_energy) + Number(obj2.before.kinetic_energy))}
					</div>
				</div>
			</div>
		</div>

		<div class="flex-row items-center space-x-4 card-body !pt-0">
			<div class="w-full shadow stats">
				<div class="stat">
					<div class="stat-title">Initial Relative Speed</div>
					<div class="stat-value">
						{Math.abs(Number(obj1.before.velocity) - Number(obj2.before.velocity))}
					</div>
				</div>
				<div class="stat">
					<div class="stat-title">Final Relative Speed</div>
					<div class="stat-value text-info">
						{Math.abs(Number(obj1.after.velocity) - Number(obj2.after.velocity))}
					</div>
				</div>
			</div>
		</div>

		<div class="flex-row items-center space-x-4 card-body !pt-0">
			<div class="w-full shadow stats">
				<div class="stat">
					<div class="stat-title">Center of Mass Velocity</div>
					<div class="stat-value">
						{(Number(obj1.before.momentum) + Number(obj2.before.momentum)) /
							(Number(obj1.before.mass) + Number(obj2.before.mass))}
					</div>
				</div>
				<div class="stat">
					<div class="stat-title">Convertible Kinetic Energy</div>
					<div class="stat-value text-info">
						{
							(Number(obj1.before.kinetic_energy) + Number(obj2.before.kinetic_energy)) - (((Number(obj1.before.velocity) - ((Number(obj1.before.momentum) + Number(obj2.before.momentum)) /
							(Number(obj1.before.mass) + Number(obj2.before.mass)))) ^ 2) * Number(obj1.before.mass) / 2 +
							((Number(obj2.before.velocity) - ((Number(obj1.before.momentum) + Number(obj2.before.momentum)) /
							(Number(obj1.before.mass) + Number(obj2.before.mass)))) ^ 2) * Number(obj2.before.mass) / 2)
						}
					</div>
				</div>
				<div class="stat">
					<div class="stat-title">Non-Convertible Kinetic Energy</div>
					<div class="stat-value text-info">
						{
							((Number(obj1.before.velocity) - ((Number(obj1.before.momentum) + Number(obj2.before.momentum)) /
							(Number(obj1.before.mass) + Number(obj2.before.mass)))) ^ 2) * Number(obj1.before.mass) / 2 +
							((Number(obj2.before.velocity) - ((Number(obj1.before.momentum) + Number(obj2.before.momentum)) /
							(Number(obj1.before.mass) + Number(obj2.before.mass)))) ^ 2) * Number(obj2.before.mass) / 2
						}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
