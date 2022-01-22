<script lang="ts">
	import katex from 'katex';

	import 'katex/dist/katex.min.css';

	export let math: string;
	export let displayMode = false;

	const options = {
		displayMode: displayMode,
		throwOnError: false
	};

	function processString(str: string) {
		const rendered = katex.renderToString(str, options);
		//console.log(rendered)
		return rendered;
	}

	$: katexString = processString(math);
</script>

<div class="mt-5">
	{@html katexString}
</div>
