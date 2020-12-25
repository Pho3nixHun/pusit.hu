<script context="module" lang="ts">
    import type SlideElement from '../components/Slidy.svelte';

    export type Detail = {
        key: string,
        value: string
    }

    export interface ReferenceProperties {
        images: SlideElement[],
        title: string,
        details: Detail[],
        article: string,
        reverse: boolean
    }

</script>
<script lang="ts">
    import Slidy from '../components/Slidy.svelte';
    import Markdown from '../Markdown.svelte';

    export let images: SlideElement[] = [];
    export let title: string = '';
    export let details: Detail[] = [];
    export let article: string;
    export let reverse: boolean = false;

    export let resolveKey = (key: string) => key;
</script>

<style lang="scss">
    .reference {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: 'left right';
        gap: 1rem;
        .info {
            display: grid;
            grid-template-areas: 
                'title'
                'details'
                'description'
            ;
            > h3 {
                grid-area: title;
            }
            > .details {
                grid-area: details;
                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: repeat(auto, 1fr);
                .detail {
                    display: grid;
                    grid-template-areas: "key value";
                    grid-template-columns: 1fr 1fr;
                    .key {
                        grid-area: key;
                        font-weight: 500;
                    }
                    .value {
                        grid-area: value;
                    }
                }
            }
        }
        .images {
            padding: 0.25rem;
            border: 1px solid rgba(0,0,0,.5);
            background-color: white;
            border-radius: 12px;
            box-shadow: 2px 3px 6px rgba(0,0,0,.4);
            :global(.slider-inner) {
                border-radius: 12px;
            }
            :global(.arrow-left), :global(.arrow-right) {
                background-color: rgba(255,255,255,.75);
                border-radius: 3px;    
                font-size: 18pt;
                line-height: 16pt;
                color: #444;
            } 
        }
        &:not(.reverse) {
            .info {
                grid-area: left;
            }
            .images {
                grid-area: right;
            }
        }
        &.reverse {
            .info {
                grid-area: right;
            }
            .images {
                grid-area: left;
            }
        }
    }
    @media screen and (max-width: 767px) {
        article {
            grid-template-rows: 1fr 1fr !important;
            grid-template-columns: 1fr !important;
            grid-template-areas: 
                'left'
                'right' 
                !important
            ;
            
            .info {
                grid-area: left !important;
            }
            .images {
                grid-area: right !important;
            }
        
        }
        
    }
</style>

<article id="{$$props.id}" class:reverse class="reference {$$props.class ?? ''}" style="{$$props.style ?? ''}">
    <section class="info">
        <h3> {title} </h3>
        <section class="details">
            {#each details as detail}
                <div class="detail">
                    <span class="key">{resolveKey(detail.key)}</span>
                    <span class="value">{detail.value}</span>
                </div>
            {/each}
        </section>
        {#if article}
            <section class="description">
                <Markdown src="{article}" />
            </section>
        {/if}
    </section>
    <section class="images">
        <Slidy axis="x" slides={images} slide={{width: '100%', class: 'slider-inner'}} controls={{arrows: true}}>

        </Slidy>
    </section>
</article>