<script>
	import Balls from "./Balls.svelte";
	import Solution from "./Solution.svelte";
	import AddSolutionButton from "./AddSolutionButton.svelte";
	import Toast from "./Toast.svelte";
	import { solutions } from "./stores.js";
	import { onDestroy } from "svelte";

	let solutions_current;
	let showToast = false;

	const unsubscribe = solutions.subscribe((value) => {
		solutions_current = value;
	});

	onDestroy(() => {
		unsubscribe();
	});

	const saveToLocal = () => {
		const solutionsJson = JSON.stringify(solutions_current);
		localStorage.setItem("solutions", solutionsJson);
		showToast = true;
		setTimeout(() => {
			showToast = false;
		}, 1500);
	};

	const addSolution = () => {
		const dateObj = new Date();
		const yyyy = dateObj.getFullYear();
		let mm = dateObj.getMonth() + 1;
		let dd = dateObj.getDate();
		if (mm < 10) mm = `0${mm}`;
		if (dd < 10) dd = `0${dd}`;
		solutions.update((n) => [
			...n,
			{ name: "New Solution", prepDate: `${yyyy}-${mm}-${dd}` },
		]);
	};
</script>

<AddSolutionButton on:click={addSolution} />

<Balls />

<Toast show={showToast}>Saved!</Toast>

<main>
	<h1>JCQC - Solution Monitor</h1>

	<div class="solution-parent">
		{#each solutions_current as solution}
			<Solution {solution} on:save={saveToLocal} />
		{/each}
	</div>
</main>

<style>
	main {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 10px 50px;
		font-family: sans-serif;
		text-align: center;
		width: 100%;
		padding: 0;
		margin: 0;
	}
	h1 {
		letter-spacing: 10px;
		color: rgba(0, 0, 0, 0.3);
	}
	.solution-parent {
		display: inline-flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
	}
</style>
