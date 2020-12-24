<script context="module" lang="ts">
    import type GoogleMapProperties from '../components/GoogleMap.svelte';
    export type AnimationOptions = {
        delay?: number,
        duration?: number
    };
        
    export type Config = {
        animations?: {
            in: AnimationOptions,
            out: AnimationOptions
        },
        google: {
            maps: {
                options: GoogleMapProperties
            }
        }
    }
</script>

<script lang="ts">

	import { _ } from 'svelte-i18n';
    import {fade} from 'svelte/transition';
    import mapStyle from '../wy.mapstyle.json';
    import GoogleMap from '../components/GoogleMap.svelte';
    import Marker from '../components/GoogleMapMarker.svelte';
    import CustomMapStyle from '../components/GoogleMapStyle.svelte';
    import InfoWindow from '../components/GoogleMapInfoWindow.svelte';
    import ContactForm from '../components/ContactForm.svelte';
    import merge from 'deepmerge';

    export let media;
    let defaultConfig = {
        google: {
            maps: {
                style: mapStyle,
                options: {
                    zoom: 10,
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false
                },
                markers: []
            }
        },
        animations: {
            in: {
                delay: 300,
                duration: 300
            },
            out: {
                duration: 300
            }
        }
    }
    export let google: any = {};
    export let animations: any = {};
    $: config = merge(defaultConfig, {google, animations});
    $: mapCenter = { ...(config.google.maps.options?.[$media.xs ? 'center-sm' : 'center'] || config.google.maps.options.center) }
</script>

<style lang="scss">
    section {
        :global(.map) {
            :global(.infoWindow) {
                :global(img) {
                    max-width: 64px;
                }
                :global(*) {
                    text-align: center;
                    max-width: 105px;
                }
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                max-width: 120px;
            }
            &:after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 128px;
                background: linear-gradient(to bottom, white 15%, rgba(255,255,255,0.6) 90%, transparent);
            }
            width: 100vw;
            position: absolute;
            bottom: -45px;
            top: -128px;
        }
        min-height: 80vh;
        position: relative;
        .card {
            display: inline-block;
            width: 45vw;
            padding: 1rem;
            border-radius: 12px;
            border: 1px solid rgba(0,0,0,.2);
            box-shadow: 0 3px 6px #444;
            background: white;
            min-width: 20rem;
            z-index: 2;
            align-self: flex-end;
        }
        @media screen and (max-width: 575px) {
            .card {
                margin: 25rem auto 0 auto !important;
                align-self: start;
            }
        }
    }
</style>

<section class="d-flex flex-column align-items-stretch" in:fade={config.animations.in} out:fade={config.animations.out}>
    <GoogleMap class="map" apiKey={config.google.maps.apiKey} options={config.google.maps.options} bind:center={mapCenter} let:map>
        <CustomMapStyle map={map} value={config.google.maps.style}></CustomMapStyle>
        {#each config.google.maps.markers as markerProps}
            <Marker map={map} {...markerProps} let:marker> 
                <InfoWindow map={map} marker={marker}>
                    <div class="infoWindow">
                        <img src="{$_('company.logo')}" alt="logo">
                        <span>{$_('company.type')}</span>
                        <div>{$_('company.address')}</div>
                    </div>
                </InfoWindow>
            </Marker>
        {/each}
    </GoogleMap>
    <div class="card m-5 mt-15">
        <ContactForm></ContactForm>
    </div>
</section>
