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

    $: config = merge(defaultConfig, {
        wrap: wrap ?? {},
        slide: slide ?? {},
        slides: slides?.map((img, id) => ({ ...img, id})) ?? [{id: 0, src: "https://via.placeholder.com/500?text=No+images"}],
        controls: controls ?? {},
        duration: duration ?? 0,
        axis: axis ?? 'x',
        loader: loader ?? {}
    })
</script>

<Slidy {...config} let:item>
    <slot {item}></slot>
</Slidy>