<script lang="ts">
	import MathInput from '$lib/components/MathInput.svelte';
	import type { state } from '$lib/ts/solver';

	export let time: string;

	export let state: state;
</script>

<div class="card shadow-lg compact side bg-base-100 my-6">
	<div class="flex-row items-center space-x-4 card-body">
		<div class="flex-1">
			<h2 class="card-title text-accent !text-2xl">{time}</h2>
			<div class="ml-4">
				<MathInput name="Mass" units="kg" bind:input={state.mass} />
				<MathInput
					name="Velocity"
					units="\frac{'{'}m{'}'}{'{'}s{'}'}"
					bind:input={state.velocity}
				/>
				<MathInput
					name="Momentum"
					units="\frac{'{'}kg \cdot m{'}'}{'{'}s{'}'}"
					bind:input={state.momentum}
				/>
				<MathInput name="Ke" units="J" bind:input={state.kinetic_energy} />
			</div>
		</div>
	</div>
</div>
