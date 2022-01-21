<script lang="ts">
    import Mathinput from "$lib/components/mathinput.svelte";

    export let time: string;
</script>

<h3>{time}</h3>
<Mathinput name="Mass" units="kg"></Mathinput>
<Mathinput name="Velocity" units="m/s"></Mathinput>
<Mathinput name="Momentum" units="(kg*m)/s"></Mathinput>
<Mathinput name="KE" units="J"></Mathinput>