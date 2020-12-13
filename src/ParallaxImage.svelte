<script lang="ts">
	export let layers = [];
	let y: number = 0;
    $: backgroundImages = layers.map(img => `url(${img})`).join(', ');
    $: backgroundPosition = layers.map((img, i) => `center ${(y * i / ((layers.length-1)*2)).toFixed(1)}px`).join(', ');
</script>

<svelte:window bind:scrollY={y}/>
<div class="parallax-base d-flex justify-content-center align-items-center" style="background-image: {backgroundImages}; background-position: {backgroundPosition};">
    <slot></slot>
</div>

<style>
    .parallax-base {
        background-size: cover;
        min-height: 101vh;
        width: 100%;
        background-color: black;
        background-position: center 0px;
        background-repeat: no-repeat;
    }
</style>