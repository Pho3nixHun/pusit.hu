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
    .fx-1 {
        flex: 1;
    }
    .flex-row {
        display: flex;
        flex-direction: row;
    }
    .flex-column {
        display: flex;
        flex-direction: column;
    }
    .justify-content-end {
        justify-content: end;
    }
    .justify-content-center {
        justify-content: center;
    }
    .align-items-end {
        align-items: flex-end;
    }
    .mr-3 {
        margin-right: 0.75rem;
    }
</style>
<div class="root d-flex flex-row" class:scrolled={y > 0} class:sticky={sticky}>
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