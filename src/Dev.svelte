<script lang="ts">
    import Partners from "./Partners.svelte";

    export let title: string;
    export let favicon: string;
    export let debug: boolean = true;

    let mainElement;
    let hovered = [];

    let clientHeight: number;
    let clientWidth: number;

    let mainElementHeight: number;
    let mainElementWidth: number;

    $: sameHeight = clientHeight === mainElementHeight;
    $: sameWidth = clientWidth === mainElementWidth;

    const mousemove = () => {
        hovered = mainElement ? [...mainElement.querySelectorAll(':hover')] : [];
    }

    const config = {
        partners: [
            { name: 'Generálép-3 Kft.', href: '//generalep-3.hu', logo: '/images/partners/generalep-3.svg'},
            { name: 'Chemostart Kft.', href: '//chemostart.hu', logo: '/images/partners/chemo.png'},
            { name: 'GSV Gulyás Tüzép Kft.', href: '//gsv.hu', logo: '/images/partners/gsv.jpg'},
            { name: 'Dutrade Zrt.', href: '//dutrade.hu', logo: '/images/partners/dutrade.png'},
            { name: 'Nord-Point Kft.', href: '//nord-point.hu', logo: '/images/partners/nord-point2.jpg'},
            { name: 'Zákány Szerszámház Kft.', href: '//zakanyszerszamhaz.hu', logo: '/images/partners/zakany.png'},
            { name: 'RR.Westor Kft.', href: '//rrwestor.hu', logo: '/images/partners/rr-westor.png'},
            { name: 'Magyar Doka Zsalutechnika Kft.', href: '//doka.hu', logo: '/images/partners/doka.svg'}
        ]
    }
</script>

<style lang="scss">
	@import "./css/bootstrap.scss";
    :global(body, html) {
        margin: 0;
        padding: 0;
    }
    .debug {
        &, *:hover, :global(*:hover) {
            outline: 3px dashed rgba(255,0,0,0.4);
            background-color: rgba(36, 35, 35, 0.1);
        }
        z-index: 9999;
        .debug-info {
            box-shadow: 0 0 10px white;
            border-radius: 0.5rem;
            background: rgba(255,255,255,0.4);
            top: 1rem;
            left: 1rem;
        }
        .red {
            color: red;
            font-weight: 600;
        }

    }
    .main {
        height: 100vh;
        width: 100vw;
        &, & * {
            box-sizing: border-box;
        }
    }
</style>

<svelte:window bind:innerHeight={clientHeight} bind:innerWidth={clientWidth}></svelte:window>

<section 
    on:mousemove={mousemove} 
    bind:this={mainElement} 
    bind:offsetHeight={mainElementHeight} 
    bind:offsetWidth={mainElementWidth} 
    class:debug={debug} 
    class="main d-flex flex-column justify-content-around p-2"
>
    {#if debug}
        <div class="debug-info d-flex flex-column position-absolute p-2">
            <span>ClientOffset: {clientWidth} : {clientHeight} </span>
            <span>MainElement: 
                <span class:red={!sameWidth}>{clientWidth}</span> : 
                <span class:red={!sameHeight}>{clientHeight}</span>
            </span>
            {#each hovered as hover}
                <span>{hover.id ? `${hover.nodeName}#${hover.id}` : hover.nodeName}: {hover.offsetWidth} : {hover.offsetHeight}</span>
            {/each}
        </div>
    {/if}
    <Partners {...config}></Partners>
    <Partners {...config}></Partners>
</section>