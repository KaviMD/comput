<script lang="ts">
	export let name: string;
    export let units: string;
	export let input = '';
</script>

<label class="input-group">
	<span>{ name }</span>
	<input type="text" placeholder="0" bind:value={input} class="input input-bordered" />
    <span>{ units }</span>
</label>
