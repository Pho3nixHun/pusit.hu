<script context="module" lang="ts">
    
</script>
<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let delay: number;
    export let shown: boolean = false;
    export let beforeInstallPromptEvent: Event;

    const dispatch = createEventDispatcher();

    const installEventPromise = new Promise((resolve, reject) => {
        window.addEventListener('beforeinstallprompt', async (e) => {
            e.preventDefault();
            setTimeout(resolve.bind(null, e), delay ?? 0);
        }, { once: true, passive: true });
    });
    const open = (installEvent) => {
        shown = true;
        beforeInstallPromptEvent = installEvent; 
        const result = {
            close(clickEvent) {
                shown = false;
                dispatch('dismissed', clickEvent);
            },
            async prompt(clickEvent) {
                installEvent.prompt();
                const result: { outcome: 'accepted' | 'dismissed' } = await installEvent.userChoice;
                dispatch(result.outcome, result);
            }
        }
        dispatch('shown', result);
        return result;
    }
</script>

{#await installEventPromise.then(open) then {close, prompt}}
    {#if shown}
        <div class="{$$props.class ?? ''}" style="{$$props.style ?? ''}">
            <slot close={close} prompt={prompt}></slot>
        </div>
    {/if}
{/await}