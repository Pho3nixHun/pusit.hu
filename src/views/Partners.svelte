<script lang="ts">
	import { _ } from 'svelte-i18n';
    import {fade} from 'svelte/transition';
import Markdown from "../Markdown.svelte";
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
<section in:fade={config.animations.in} out:fade={config.animations.out}>
    <h1> {$_('partners.title')} </h1>
    <Markdown src="/articles/partners.md"></Markdown>
</section>