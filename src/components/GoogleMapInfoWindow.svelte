<script context="module" lang="ts">
    
</script>
<script lang="ts">
    import { onMount } from 'svelte';

    export let map, marker;
    let rootElement: HTMLElement;
    let infoWindow;
    let animationFinished = false;

    const addInfoWindow = (map, marker) => {
        const google = window['google'];
        infoWindow = new google.maps.InfoWindow({ content: rootElement });
        marker.addListener("animation_changed", () => {
            infoWindow.open(map, marker);
            animationFinished = true;
        });
        marker.addListener("click", () => infoWindow.open(map, marker))
    }
    onMount(() => addInfoWindow(map, marker))

</script>

<style lang="scss">
    div {
        :global(*) {
            visibility: hidden;
        }
        &.settled {
            :global(*) {
                visibility: visible;
            }
        }
    }
</style>

<div class:settled={animationFinished} bind:this={rootElement}>
    <slot></slot>
</div>