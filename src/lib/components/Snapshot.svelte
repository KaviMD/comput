<script lang="ts">
	import Mathinput from '$lib/components/mathinput.svelte';
    import type { state } from '$lib/ts/solver';

	export let time: string;

    export let state: state;
</script>

<div class="card shadow-lg compact side bg-base-100 my-6">
	<div class="flex-row items-center space-x-4 card-body">
		<div class="flex-1">
			<h2 class="card-title text-accent !text-2xl">{time}</h2>
			<div class="ml-4">
				<Mathinput name="Mass" units="kg" bind:input={state.mass.val} />
				<Mathinput name="Velocity" units="\frac{'{'}m{'}'}{'{'}s{'}'}" bind:input={state.velocity.val} />
				<Mathinput name="Momentum" units="\frac{'{'}kg \cdot m{'}'}{'{'}s{'}'}" bind:input={state.momentum.val} />
				<Mathinput name="Ke" units="J" bind:input={state.kinetic_energy.val} />
			</div>
		</div>
	</div>
</div>
