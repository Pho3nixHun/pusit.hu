<script context="module" lang="ts">
    export type Map = any;
    export type GoogleMapProperties = {
        zoom?: number,
        zoomControl?: boolean,
        mapTypeControl?: boolean,
        scaleControl?: boolean,
        streetViewControl?: boolean,
        rotateControl?: boolean,
        fullscreenControl?: boolean
    }
</script>
<script lang="ts">
    import { Loader } from "@googlemaps/js-api-loader"
    import {fade} from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let mapElement: HTMLElement;
    let rootElement: HTMLElement;
    export let center: {lat: number, lng: number };
    let map: Map;

    export let apiKey: string;
    export let version: string = 'weekly';
    export let options;

    const initMap = (options) => {
        const google = window['google'];
        map = new google.maps.Map(mapElement, options);
        if (center) setCenter(center);
        return map;
    }
    const setCenter = (center) => {
        map?.setCenter(center);
    }
    $: loading = new Loader({apiKey, version}).load().then(initMap.bind(null, options));
    $: setCenter(center);
</script>

<div bind:this={rootElement}>
    {#await loading}
        Loading Google Maps...
    {:then map}
        <slot map={map}></slot>
    {:catch ex}
        Have you forgot something?!
        <pre>
            {ex.message}
        </pre>
    {/await}
    <div id="map" bind:this={mapElement} class="{$$props.class ?? ''}" style="{$$props.style ?? ''}">
    </div>
</div>