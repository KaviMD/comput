<script lang="ts">
	import Mathinput from '$lib/components/mathinput.svelte';
    //import { state } from '$lib/ts/solver.ts';

	export let time: string;

    export let state:
</script>

<div class="card shadow-lg compact side bg-base-100 my-6">
	<div class="flex-row items-center space-x-4 card-body">
		<div class="flex-1">
			<h2 class="card-title text-accent !text-2xl">{time}</h2>
			<div class="ml-4">
				<Mathinput name="Mass" units="kg" />
				<Mathinput name="Velocity" units="\frac{'{'}m{'}'}{'{'}s{'}'}" />
				<Mathinput name="Momentum" units="\frac{'{'}kg \cdot m{'}'}{'{'}s{'}'}" />
				<Mathinput missing={true} name="Ke" units="J" />
			</div>
		</div>
	</div>
</div>
