<script context="module" lang="ts">
    export type AnimationOptions = {
        delay?: number,
        duration?: number
    };
        
    export type Config = {
        sections: {
            imagePosition: 'left' | 'above' | 'right' | 'none',
            markdownSource: string
        }[],
        animations?: {
            in: AnimationOptions,
            out: AnimationOptions
        },
    }
</script>

<script lang="ts">
    import Markdown from '../components/Markdown.svelte';

	import { _ } from 'svelte-i18n';
    import {fade} from 'svelte/transition';

    export let config = {
        sections: [
            {
                imagePosition: 'left',
                markdownSource: '/assets/articles/about.md'
            }
        ],
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
</script>

<style lang="scss">
    section{
        width: 100%;
    }
    .article {
        :global(img) {
            margin-bottom: 1rem;
            background-color: #fff;
            border: 1px solid #ccc;
            border: 1px solid rgba(0, 0, 0, 0.2);
        }
        &.image-none :global(img) {
            display: none;
            box-shadow: 0px 3px 6px rgba(0,0,0,0.16), 0px 3px 6px rgba(0,0,0,0.23);
        }
        &.image-left :global(img) {
            float: left;
            margin-right: 2rem;
            box-shadow: -2px 3px 6px rgba(0,0,0,0.16), -2px 3px 6px rgba(0,0,0,0.23);
        }
        &.image-right :global(img) {
            float: right;
            margin-left: 1rem;
            box-shadow: 2px 3px 6px rgba(0,0,0,0.16), 2px 3px 6px rgba(0,0,0,0.23);
        }
        &.image-above :global(img) {
            display: block;
            margin-bottom: 1rem;
        }
    }
    @media (max-width: 768px) {
        .article :global(img) {
            display: block;
            width: 100%;
            object-fit: cover;
            float: none !important;
        }
    }
</style>

<section class="my-5" in:fade={config.animations.in} out:fade={config.animations.out}>
    {#each config.sections as section, key}
        <section class="article px-5 py-3 image-{section.imagePosition}" data-key="services-{key}">
            <Markdown imageSkeleton={true} src={section.markdownSource}></Markdown>
        </section>
    {/each}
</section>