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
    export let articles: ReferenceProperties[] = [];
    export let media;
    const getOrientation = (media): 'column' | 'row' => {
        return media.xs || media.sm ? 'column' : 'row'
    }
    $: articleOrientation = getOrientation($media);
    $: sortedArticles = articles.sort((a, b) => {
        console.log(a, b);
        const findDate = ({key}) => key === 'date';
        const aDate:string = a?.details?.find(findDate)?.value;
        const bDate:string = b?.details?.find(findDate)?.value;
        return bDate.localeCompare(aDate);
    }).map((articles, i) => Object.assign({}, articles, {reverse: !!(i % 2)}));
    
</script>
<style lang="scss">
</style>
<section in:fade={animations.in} out:fade={animations.out} class="p-5">
    <!--<Reference></Reference>-->
    {#each sortedArticles as article}
        <Reference class="mt-5" {...article} orientation={articleOrientation} resolveKey={$_}></Reference>
    {/each}
</section>