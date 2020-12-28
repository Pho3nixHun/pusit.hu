<script lang="ts">
	import { _ } from 'svelte-i18n';
    import {fade} from 'svelte/transition';
    import Markdown from "../components/Markdown.svelte";
    
    export let media;
    export let config = {
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
    section {
        margin: 1rem;
        :global(blockquote), :global(p) {
            margin: 0;
        }
        :global(ul) {
            list-style-type: none;
        }
        > :global(div) {
            display: flex;
            flex-direction: var(--flex-direction, 'row');
            flex-wrap: wrap;
            justify-content: center;
            align-items: stretch;
            > :global(*) {
                flex: 1 1 0px;
                margin: 1rem;
            }
            > :global(blockquote) {
                z-index: 2;
                margin-bottom: 1rem;
                background-color: #fff;
                border: 1px solid #ccc;
                border: 1px solid rgba(0, 0, 0, 0.2);
                box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
                padding: 1.75rem;
                display: inline-grid;
                gap: 1rem;
                grid-auto-rows: max-content;
                grid-template-areas:
                    "Logo Title"
                    "Logo Description"
                    "Logo Place"
                    "Logo Phone"
                    "Logo Fax"
                    "Logo Email"
                    "Logo Web";
                
                > :global(h1), :global(h2), :global(h3) { grid-area: Title; }
                > :global(p) { grid-area: Logo; margin: 0 auto; }
                > :global(blockquote:nth-of-type(1)) { grid-area: Description; }
                > :global(blockquote:nth-of-type(2)) { grid-area: Place; }
                > :global(blockquote:nth-of-type(3)) { grid-area: Phone; }
                > :global(blockquote:nth-of-type(4)) { grid-area: Fax; }
                > :global(blockquote:nth-of-type(5)) { grid-area: Email; }
                > :global(blockquote:nth-of-type(6)) { grid-area: Web; }
            }
        }
    }
    section.narrow {
        > :global(div) {
            
            align-items: start;
            > :global(blockquote) {
                min-width: 100%;
                justify-content: center;
                grid-template-areas: 
                "Logo"
                "Title"
                "Description"
                "Place"
                "Phone"
                "Fax"
                "Email"
                "Web";
            }
        }
    }

</style>
<section in:fade={config.animations.in} out:fade={config.animations.out} class:narrow={!$media?.md}>
    <Markdown src="/assets/articles/partners.md"></Markdown>
</section>