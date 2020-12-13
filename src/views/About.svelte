<script lang="ts">
    import "bootstrap/dist/css/bootstrap.min.css";
    import Markdown from '../Markdown.svelte';

	import { _ } from 'svelte-i18n';
    import {fade} from 'svelte/transition';
import ParallaxImage from "../ParallaxImage.svelte";
    
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

<style>

</style>

<section class="" in:fade={config.animations.in} out:fade={config.animations.out}>

    <section class="parallax">
        <ParallaxImage></ParallaxImage>
    </section>    
    <section class="article px-5">
        <h1> {$_('about.title')} </h1>
        <Markdown src="/articles/about.md"></Markdown>
    </section>
</section>