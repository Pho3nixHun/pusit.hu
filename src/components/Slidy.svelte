<script context="module" lang="ts">
    export type SlideElement = { id?: number, src: string, header?: string, text?: string };
    export type Wrap = {
        id?: string, // customize this instance Slidy by #id
        width?: string,
        height?: string,
        padding?: string,
    };
    export type SlideRoot = {
        gap?: number,
        class?: string, // classname for styling slide
        width?: string,
        height?: string,
        backimg?: boolean, // if true image on background slidewrap & slot for content empty
        imgsrckey?: string, // prop for ypurs image src key
        objectFit?: string
    };
    export type Controls = {
        dots?: boolean,
        dotsnum?: boolean,
        dotsarrow?: boolean,
        dotspure?: boolean, // dotnav like realy dots :)
        arrows?: boolean,
        keys?: boolean, // nav by arrow keys
        drag?: boolean, // nav by mousedrag
        wheel?: boolean, // nav by mousewheel (shift + wheel) or swipe on touch/trackpads
    };
    export type Loader = {
        color?: string,
        size?: number,
        speed?: number, //?
        thickness?: number,
    };
    export type Axis = 'x' | 'y';
    export interface SlidyProperties {
        slides?: SlideElement[], // new name "slides" for arr yours slides elements in 2.0
        wrap?: Wrap,
        slide?: SlideRoot,
        controls?: Controls,
        duration?: number, // duration slides animation
        axis?: 'x' | 'y', // new in 2.2.0 axis direction
        loader?: Loader
    };
</script>
<script lang="ts">
    import Slidy from 'svelte-slidy';
    import defaultConfig from './Slidy.default.json';
    import merge from 'deepmerge';

    export let wrap: Wrap;
    export let slide: SlideRoot;
    export let slides: SlideElement[];
    export let controls: Controls;
    export let duration: number;
    export let axis: Axis;
    export let loader: Loader;
    export let fullscreen: boolean = false;
    let currentIndex;
    $: config = merge(defaultConfig, {
        wrap: wrap ?? {},
        slide: slide ?? {},
        slides: slides?.map((img, id) => ({ ...img, id})) ?? [{id: 0, src: "https://via.placeholder.com/500?text=No+images"}],
        controls: controls ?? {},
        duration: duration ?? 0,
        axis: axis ?? 'x',
        loader: loader ?? {}
    })
    $: fullscreenConfig = merge(config, {
        wrap: {width: '100%', height: '100%'},
        slide: {width: '100%', height: '100%', objectFit: 'contain'},
        controls: {arrows: true}
    })
</script>
<style lang="scss">
    .fullscreen {
        position: fixed;
        inset: 0;
        z-index: 1200;
        backdrop-filter: blur(10px);
        background-color: rgba(0,0,0,.8);
        button {
            background: none;
            border: none;
            font-size: 3rem;
            position: absolute;
            right: 1rem;
            top: 1rem;
            line-height: 1rem;
            color: white;
            z-index: 1300;
            transition: all 300ms ease;
            &:focus {
                outline: none;
            }
            &:focus, &:hover, &:active {
                text-shadow: 0 0 5px white;
            }
        }
    }
</style>
{#if fullscreen}
    <div class="fullscreen">
        <button on:click={() => fullscreen = false}>×</button>
        <Slidy {...fullscreenConfig} bind:index={currentIndex}  let:item>
            <slot {item}></slot>
        </Slidy>
    </div>
{/if}
<div on:click={() => fullscreen = true}>
    <Slidy {...config} let:item bind:index={currentIndex} >
        <slot {item}></slot>
    </Slidy>
</div>