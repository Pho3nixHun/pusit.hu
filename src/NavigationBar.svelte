<script lang="ts">
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
<div class="navbar-root flex-row" class:scrolled={y > 0} class:sticky={sticky}>
    <div class="backdrop"></div>
    <slot name="brand"></slot>
    {#if expanded }
        <nav class="expanded fx-1 flex-row justify-content-end ">
            <slot></slot>
        </nav>
    {:else}
        <div class="hamburger fx-1 flex-column justify-content-center align-items-end mr-3">
            <Hamburger bind:isOpen={isOpen}></Hamburger>
        </div>
        {#if isOpen}
            <div class="collapsed flex-column justify-content-center" in:animFn={animation} out:animFn={animation} on:click="{toggle}">
                <nav>
                    <slot></slot>
                </nav>
            </div>
        {/if}
    {/if}
</div>