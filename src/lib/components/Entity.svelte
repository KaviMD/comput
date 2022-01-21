<script lang="ts">
    import Snapshot from "$lib/components/Snapshot.svelte";

    export let name: string;
</script>

<h2>{name}</h2>
<Snapshot time="before collision"/>
<Snapshot time="after collision"/>