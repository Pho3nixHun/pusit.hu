<script context="module" lang="ts">
    export type GoogleMap = any;
    export type GoogleMapStyle = any;
</script>
<script lang="ts">
    export let value;
    export let map;
    
    const applyStyle = (map, style) => {
        const google = window['google'];
        if (google && map && style) {
            const styledMapType = new google.maps.StyledMapType(style);
            map.mapTypes.set("style", styledMapType);
            map.setMapTypeId("style");
        }
    }
    $: applyStyle(map, value)
</script>