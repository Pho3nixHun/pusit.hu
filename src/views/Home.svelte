<script context="module" lang="ts">
    import type SlidyProperties from '../components/Slidy.svelte';

    export type AnimationOptions = {
        delay?: number,
        duration?: number
    };
    export type Animation = {
        in: AnimationOptions,
        out: AnimationOptions
    }
    export type g = {
        animations?: {
            in: AnimationOptions,
            out: AnimationOptions
        },
        partners: {
            name?: string,
            href?: string,
            logo: string
        }[],
        cards: {
            valueLabel: string,
            textLabel: string,
            href?: string,
            icon: string,
            image: string
        }[],
        parallaxImages?: String[],
        slider: SlidyProperties
    };
</script>

<script lang="ts">
    import ParallaxImage from '../components/ParallaxImage.svelte';
    import Markdown from '../components/Markdown.svelte';
	import ImageCompare from 'svelte-image-compare';
    import Slidy from '../components/Slidy.svelte';
    import Partners from "../Partners.svelte";
    import Card from '../components/Card.svelte';
    import * as Icons from 'svelte-awesome/icons';

	import { _ } from 'svelte-i18n';
    import { fade } from 'svelte/transition';

    export let animations: Animation = {
        in: {
            delay: 300,
            duration: 300
        },
        out: {
            duration: 300
        }
    }
    export let parallaxImages = [];
    export let partners = [];
    export let cards = [];
    export let slider = {};
    let y;
</script>
<style lang="scss">
    .parallax {
        margin-top: -128px;
        background-color: black;
    }
    .black {
        color: white;
        background-color: black;
    }
    .black-white {
        color: white;
        background: linear-gradient(185deg, #000 80%, transparent 0%); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
    .white-black {
        color: white;
        background: linear-gradient(184deg, transparent 10%, #000 10%);
        padding-top: 8rem;
    }
    .white {
        color: black;
        background-color: transparent;
    }
    .parallax img {
        transition: opacity 300ms ease;
    }
    .slide {
        article {
            background-color: rgba(0,0,0,.5);
            box-shadow: 0 0 10px 0 rgba(22, 1, 40, 0.9);
            border-radius: 20px;
            min-width: 20rem;
            overflow: hidden;
            color: white;
            border: 1px solid rgba(0,0,0,.45);
            h4, p {
                text-shadow: 0 0 5px rgba(0, 0, 0, .9);
            }
        }
    }
    .publications{
        img {
            padding: 12.5%;
            width: 100%;
            object-fit: cover;
            object-position: left;
        }
    }
    .display {
        left: 5rem;
        text-shadow: 1px 1px 1px white;
    }
    @keyframes flyAway {
        from {
            margin-bottom: -10px;
            margin-left: 250px;
            height: 2vh;
            opacity: 1;
        }
        to {
            margin-bottom: 30%;
            margin-left: 110%;
            height: 0vh;
            opacity: 0;
        }
    }

    .fx-1 {
        flex: 1;
    }
    .display h2 {
        color: white;
        text-shadow: 2px 2px 0px rgba(0,0,0,.2);
    }
</style>

<svelte:window bind:scrollY={y}/>
<section in:fade={animations.in} out:fade={animations.out}>
    <section class="parallax">
        <ParallaxImage class="" layers={parallaxImages}>
            <div class="position-absolute d-none d-md-block display col-8 col-lg-6 mr-auto"> 
                <h2>{$_('company.slogan')}</h2>
                <p>{$_('company.aspot')}</p>
            </div>
            {#if y === 0}
                <img src="/assets/images/arrows.svg" width="150px" height="150px" alt="Scroll down" class="mt-auto" in:fade={animations.in} out:fade={animations.out}>
            {/if}
        </ParallaxImage>
    </section>    
    <section class="d-flex flex-column black-white p-5">
        <div class="d-flex flex-column-reverse flex-lg-row">
            <div class="fx-1">
                <ImageCompare before="/assets/images/ref/split1.webp" after="/assets/images/ref/split2.webp" overlay={false}></ImageCompare>
            </div>
            <div class="fx-1 d-flex flex-column justify-content-around p-5">
                <h3> {$_('aboutOurCompany')} </h3>
                <Markdown src="/assets/articles/about-intro.md"></Markdown>
                <a class="align-self-start btn btn-primary px-5" href="/#/services">{$_('forward')}</a>
            </div>
        </div>
    </section>
    <section class="d-flex flex-wrap flex-lg-row justify-content-around align-items-center white m-2 my-5">
        {#each cards as card}
            <Card class="my-2 fx-1" icon="{Icons[card.icon]}" img="{card.image}">
                <h3 slot="title">{$_(card.valueLabel)}</h3>
                <p slot="text">{$_(card.textLabel)}</p>
                {#if card.href ?? true}
                    <a href="{card.href}" class="btn btn-secondary">{$_('forward')}</a>
                {/if}
            </Card>
        {/each}
    </section>
    <section class="d-flex flex-column">
        <h3 class="p-5"> {$_('ourProjects')} </h3>
        <Slidy {...slider} let:item>
            <div class="slide h-100 d-flex flex-column justify-content-end align-items-center h-100">
                <article class="d-none d-md-flex flex-column align-items-center mb-5">
                    <h4 class="mt-2">{item.header}</h4>
                    <p>{item.text}</p>
                    {#if item.href}
                        <a href="{item.href}" class="btn btn-primary mt-auto w-100">{$_('forward')}</a>
                    {/if}
                </article>
            </div>
        </Slidy>
    </section>
    <section class="publications d-flex flex-column p-5">
        <h3> {$_('wroteAboutUs')} </h3>
        <div class="d-flex flex-column flex-md-row justify-content-around">
            <a class="d-flex flex-column align-items-center" href="https://www.gsv.hu/hu/blog/tolunk-epult-oasis-residence-a-nullenergias-lakootthon">
                <img src="/assets/images/publications/gsv-2020-11.webp" alt="GSV Magazin 2020-11">
                <h3>GSV Magazin</h3>
                <h5>2020 November / Tőlünk épült</h5>
            </a>
            <a class="d-flex flex-column align-items-center" href="https://www.gsv.hu/hu/blog/tolunk-epult-modern-nullenergias-tarsashaz-hajduszoboszlon">
                <img src="/assets/images/publications/gsv-2019-06.webp" alt="GSV Magazin 2019-06">
                <h3>GSV Magazin</h3>
                <h5>2019 Június / Tőlünk épült</h5>
            </a>
        </div>
    </section>
    <section class="py-3">
        <Partners partners={partners}></Partners>
    </section>
    <section class="py-3 p-5">
        <div class="d-flex justify-content-between">
            <h3>A PUSIT Kft. telephelyének fejlesztése</h3>
            <img width="400px" src="/assets/images/infoblokk_EMVA_3c.jpg" alt="">
        </div>
        <div class="d-flex flex-column">
            <div>
                <span> Kedvezményezett neve: </span> <span class="font-weight-bold">Pusit Kft.</span>
            </div>
            <div>
                <span> A projekt címe: </span> <span class="font-weight-bold">A PUSIT Kft. telephelyének fejlesztése </span>
            </div>
            <div>
                <span> Projektazonosító: </span> <span class="font-weight-bold">: GINOP-1.2.8-20-2020-01887 </span>
            </div>
            <div>
                <span> Megvalósulási helyszín: </span> <span class="font-weight-bold">4200 Hajdúszoboszló, Bajcsy-Zsilinszky u. 97</span>
            </div>
            <div>
                <span> A szerződött támogatás összege: </span> <span class="font-weight-bold"> 27.369.792 Ft </span>
            </div>
            <div>
                <span> A támogatás mértéke: </span> <span class="font-weight-bold">70 %</span>
            </div>
            <div>
                <span> A projekt tervezett befejezésének dátuma: </span> <span class="font-weight-bold"> 2021.05.28.</span>
            </div>
        </div>
        <p>A projekt tartalmának bemutatása:</p>
        <p>
            A tárolás céljára létesített a vállalkozás egy szilárd burkolatú teret, ahol a kivitelezési
            feladatok elvégzéséhez szükséges anyagok tárolását végezzük, illetve kisebb nagyobb
            gyártási munka is elvégezhető rajta.</p>
        <p>
            Ezeket korábban nem tudta vállalkozás a saját telephelyén tárolni, így a terület
kialakításával helyben elérhetőek az alapanyagok, mely megkönnyíti és lerövidíti a munkák
teljesítési határidejét, hiszen ezek szállítási ideje naponta akár több órát is igénybe vesz. 
        </p>
        <p>A fejlesztéssel érintett terület nagysága 665,74 m2
        </p>
        <p>
            A rakodógépek beszerzésével a vállalkozás technológiai megújulása valósult meg, hiszen
eddig a vállalkozás működése során nem használt gépekkel végzik el a munkavállalók a
feladataikat. A gépek bevonása a munkafolyamatokba segíti a termelékenység
növekedését, így olyan feladatokat is el tud vállalni a vállalkozás, melyeket eddig géphiány
miatt elutasított. 
        </p>
        <p>
            A további beszerzett eszközök nagy része építőipari munkaterületen lesznek használva,
valamint a telephelyünkön végzett – eddig kézi erővel történő - eszköz és
anyagmozgatásban.
        </p>
    </section>
</section>