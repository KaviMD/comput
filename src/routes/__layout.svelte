<script lang="ts">
	import '../app.css';
	//import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';

	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	onMount(() => {
		themeChange(false);
	});
</script>

<main>
	<div class="grid grid-cols-1 gap-6 p-10 xl:grid-cols-10 bg-base-200">
		<div class="navbar col-span-1 shadow-lg xl:col-span-10 bg-neutral-focus text-neutral-content rounded-box">
			<div class="px-2 mx-2 navbar-start">
				<span class="text-lg font-bold"> yeet </span>
			</div>
			<div class="hidden px-2 mx-2 navbar-center lg:flex">
				<div class="flex items-stretch">
					<a class="btn btn-ghost btn-sm rounded-btn" href="/"> why </a>
					<a class="btn btn-ghost btn-sm rounded-btn" href="/"> though </a>
					<a class="btn btn-ghost btn-sm rounded-btn" href="/"> CH5B </a>
					<a class="btn btn-ghost btn-sm rounded-btn" href="/"> why </a>
				</div>
			</div>
			<div class="navbar-end">
				<button data-toggle-theme="dark,light" class="btn btn-square btn-ghost"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
						/>
					</svg></button
				>
			</div>
		</div>
		<slot />
	</div>
</main>
