<script lang="ts">
	import Mathinput from '$lib/components/mathinput.svelte';

	export let time: string;
</script>

<div class="card shadow-lg compact side bg-base-100 my-6">
	<div class="flex-row items-center space-x-4 card-body">
		<div class="flex-1">
			<h2 class="card-title text-accent">{time}</h2>
			<div class="ml-4">
				<Mathinput name="Mass" units="kg" />
				<Mathinput name="Velocity" units="m/s" />
				<Mathinput name="Momentum" units="(kg*m)/s" />
				<Mathinput name="KE" units="J" />
			</div>
		</div>
	</div>
</div>
