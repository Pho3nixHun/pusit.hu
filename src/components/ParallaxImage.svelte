<script lang="ts">
	export let layers = [];
    import { relativeOrientation } from './RelativeOrientationStore';
	let y: number = 0;
    $: backgroundImages = layers.map(img => `url(${img})`).join(', ');
    $: backgroundXPosition = (i) => (50 + $relativeOrientation.beta * (layers.length-i-1*3)).toFixed(2);
    $: backgroundYPosition = (i) => ((y + $relativeOrientation.alpha*(layers.length-i-1)*300) * i / ((layers.length-1)*2)).toFixed(2);
    $: backgroundPosition = layers.map((img, i) => `${backgroundXPosition(i)}% ${backgroundYPosition(i)}px`).join(', ');
</script>

<svelte:window bind:scrollY={y}/>
<div class="parallax-base d-flex justify-content-center align-items-center {$$props.class || ''}" style="background-image: {backgroundImages}; background-position: {backgroundPosition};">
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