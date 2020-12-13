<script lang="ts">
    import "bootstrap/dist/css/bootstrap.min.css";
    import Hamburger from "./Hamburger.svelte";
    import { fade as animFn } from 'svelte/transition';

    export let isOpen: boolean;
    const toggle = () => isOpen = !isOpen;
    export let expanded: boolean = false;
    export let animation = { duration: 300 };
    export let sticky: boolean = false;
    let y: number = 0;
</script>

<svelte:window bind:scrollY={y}/>

<style lang="scss">
    @import "./NavigationBar.scss";
</style>
<div class="root d-flex flex-row" class:scrolled={y > 0} class:sticky={sticky}>
    <div class="backdrop"></div>
    <slot name="brand"></slot>
    {#if expanded }
        <nav class="expanded d-flex flex-row fx-1 justify-content-end pr-3">
            <slot></slot>
        </nav>
    {:else}
        <div class="hamburger d-flex fx-1 justify-content-end align-items-center pr-3">
            <Hamburger bind:isOpen={isOpen}></Hamburger>
        </div>
        {#if isOpen}
            <div class="collapsed d-flex flex-column justify-content-center" in:animFn={animation} out:animFn={animation} on:click="{toggle}">
                <nav>
                    <slot></slot>
                </nav>
            </div>
        {/if}
    {/if}
</div>