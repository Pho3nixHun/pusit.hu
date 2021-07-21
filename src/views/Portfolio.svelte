<script context="module" lang="ts">
    import type ReferenceProperties from '../components/Reference.svelte'
    export type AnimationOptions = {
        delay?: number,
        duration?: number
    };

    export type Animations = {
        in: AnimationOptions,
        out: AnimationOptions
    }
    
    export type PortfolioProperties = {
        articles: ReferenceProperties[],
        animations?: Animations,
    }
</script>
<script lang="ts">
	import { _ } from 'svelte-i18n';
    import {fade} from 'svelte/transition';
    import Reference from '../components/Reference.svelte';
    
    export let animations: Animations = {
        in: {
            delay: 300,
            duration: 300
        },
        out: {
            duration: 300
        }
    }
    export let params: {id?: string | number} = {};
    export let articles: ReferenceProperties[] = [];
    const moveFront = (id, a, b) => a?.id == id ? -1 : b?.id == id ? 1 : 0;
    $: sortedArticles = articles.sort((a, b) => {
        const findDate = ({key}) => key === 'date';
        const aDate:string = a?.details?.find(findDate)?.value;
        const bDate:string = b?.details?.find(findDate)?.value;
        return bDate.localeCompare(aDate);
    }).sort(moveFront.bind(null, params?.id)).map((articles, i) => Object.assign({}, articles, {reverse: !!(i % 2)}));
</script>
<style lang="scss">
</style>
<section in:fade={animations.in} out:fade={animations.out} class="p-5">
    {#each sortedArticles as article, key}
        <Reference class="mt-5" {...article} resolveKey={$_} data-key="services-{key}"></Reference>
    {/each}
</section>