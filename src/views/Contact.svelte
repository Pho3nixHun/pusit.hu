<script lang="ts">
    import "bootstrap/dist/css/bootstrap.min.css";

	import { _ } from 'svelte-i18n';
    import {fade} from 'svelte/transition';
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
    <h1> {$_('contact.title')} </h1>
</section>