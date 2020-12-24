<script context="module" lang="ts">
    import type Map from './GoogleMap.svelte';
    export type GoogleMapMarker = {
        lng: number,
        lat: number
    }
    
</script>
<script lang="ts">
import GoogleMap from "./GoogleMap.svelte";


    export let lng: number;
    export let lat: number;
    export let map: Map;

    let marker;

    const addMarker = (map, lng, lat) => {
        //TODO: Delete existing marker
        marker && marker.setMap(null);
        const google = window['google'];
        marker = google && new google.maps.Marker({
            map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: {lng, lat}
        });
        return marker;
    }

    $: addMarker(map, lng, lat)
</script>

<style lang="scss">

</style>

<slot map={map} marker={marker}></slot>