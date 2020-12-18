<script context="module" lang="ts">
    type AnimationOptions = {
        delay?: number,
        duration?: number
    };
    type Config = {
        animations?: {
            in: AnimationOptions,
            out: AnimationOptions
        },
        partners: {
            name?: string,
            href?: string,
            logo: string
        }[]
        parallaxImages?: String[],
        slider?: {
            slides?: { id: number, src: string, header?: string, text?: string }[], // new name "slides" for arr yours slides elements in 2.0
            wrap?: {
                id: string, // customize this instance Slidy by #id
                width: string,
                height: string,
                padding: string,
            },
            slide?: {
                gap: number,
                class: string, // classname for styling slide
                width: string,
                height: string,
                backimg: boolean, // if true image on background slidewrap & slot for content empty
                imgsrckey: string, // prop for ypurs image src key
                objectFit: string
            },
            controls?: {
                dots: boolean,
                dotsnum: boolean,
                dotsarrow: boolean,
                dotspure: boolean, // dotnav like realy dots :)
                arrows: boolean,
                keys: boolean, // nav by arrow keys
                drag: boolean, // nav by mousedrag
                wheel: boolean, // nav by mousewheel (shift + wheel) or swipe on touch/trackpads
            },
            duration?: number, // duration slides animation
            axis?: string, // new in 2.2.0 axis direction
            loader?: { // new in 2.0 settings for preloader spinner
                color: string,
                size: number,
                speed: number, //?
                thickness: number,
            }
        }
    };
</script>

<script lang="ts">
    import ParallaxImage from '../ParallaxImage.svelte';
    import Markdown from '../Markdown.svelte';
	import ImageCompare from 'svelte-image-compare';
    import Slidy from 'svelte-slidy';
    import Partners from "../Partners.svelte";
    import merge from 'deepmerge';
    import Card from '../Card.svelte';
    import { calendar, folder, home, smileO } from 'svelte-awesome/icons';

	import { _ } from 'svelte-i18n';
    import { fade } from 'svelte/transition';

    const defaultConfig: Config = {
        animations: {
            in: {
                delay: 300,
                duration: 300
            },
            out: {
                duration: 300
            }
        },
        parallaxImages: [],
        partners: [],
        slider: { 
            slides: [], 
            wrap: {
                id: 'slidy_default', 
                width: '100%',
                height: '50vh',
                padding: '0',
            },
            slide: {
                gap: 10,
                class: '', 
                width: '80%',
                height: '100%',
                backimg: true, 
                imgsrckey: 'src',
                objectFit: 'cover'
            },
            controls: {
                dots: true,
                dotsnum: false,
                dotsarrow: false,
                dotspure: true, 
                arrows: false,
                keys: true, 
                drag: true, 
                wheel: false, 
            },
            duration: 250, 
            axis: 'x', 
            loader: { 
                color: 'red',
                size: 75,
                speed: 300,
                thickness: 1,
            }
        }
    };
    export let config: Config = defaultConfig
    let y;
    $: mergedConfig = merge(defaultConfig, config);
    $: isScrolled = y > 140;
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
            height: 10rem;
            min-width: 20rem;
            overflow: hidden;
            color: white;
            border: 1px solid rgba(0,0,0,.65);
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
        font-size: 2rem;
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
    .bird {
        position:absolute;
        height: 2vh;
        margin: 0px 0px -10px 250px;
        animation: flyAway 5s ease-out forwards;
    }

    .fx-1 {
        flex: 1;
    }
</style>

<svelte:window bind:scrollY={y}/>
<section in:fade={mergedConfig.animations.in} out:fade={mergedConfig.animations.out}>
    <section class="parallax">
        <ParallaxImage class="" layers={mergedConfig.parallaxImages}>
            <div class="position-absolute d-none d-md-block display col-8 col-lg-6 mr-auto"> 
                <h1>PUSIT KFT</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, autem rem, dolorem commodi dolore accusantium, possimus incidunt dolor quo eius vitae itaque nulla reiciendis ea? Repellendus, eius? Id, ab molestiae?</p>
            </div>
            {#if isScrolled}
                <img class="bird" alt="bird" src="/images/takeoff-animated.svg">
            {/if}
           <img src="/images/arrows.svg" width="150px" height="150px" alt="Scroll down" class="mt-auto" style="visibility:{isScrolled ? 'hidden': 'visible'}">
        </ParallaxImage>
    </section>    
    <section class="d-flex flex-column black-white p-5">
        <div class="d-flex flex-column-reverse flex-lg-row">
            <div class="fx-1">
                <ImageCompare before="/images/ref/split1.jpg" after="/images/ref/split2.jpg" overlay={false}></ImageCompare>
            </div>
            <div class="fx-1 d-flex flex-column justify-content-around p-5">
                <h3> Cégünkről </h3>
                <Markdown src="/articles/about-intro.md"></Markdown>
                <a class="align-self-start btn btn-primary px-5" href="/#/about">Tovább</a>
            </div>
        </div>
    </section>
    <section class="d-flex flex-wrap flex-lg-row justify-content-around align-items-center white m-2 my-5">
        <Card class="my-2 mr-2 fx-1" icon="{calendar}" img="/images/cards/viktor-forgacs-LNwIJHUtED4-unsplash.jpeg">
            <h3 slot="title">1996</h3>
            <p slot="text">óta a piacon</p>
            <a href="/#/" class="btn btn-light">Tovább</a>
        </Card>
        <Card class="my-2 mr-2 fx-1" icon="{folder}" img="/images/cards/daniel-mccullough-HtBlQdxfG9k-unsplash.jpeg">
            <h3 slot="title">155</h3>
            <p slot="text">megvalósult projekt</p>
            <a href="/#/" class="btn btn-light">Tovább</a>
        </Card>
        <Card class="my-2 mr-2 fx-1" icon="{home}" img="/images/cards/anthony-esau-N2zk9yXjmLA-unsplash.jpeg">
            <h3 slot="title">~21 000 m²</h3>
            <p slot="text">beépített terület</p>
            <a href="/#/" class="btn btn-light">Tovább</a>
        </Card>
        <Card class="my-2 fx-1" icon="{smileO}" img="/images/cards/austin-distel-60caCHdOqH0-unsplash.jpeg">
            <h3 slot="title">44 db</h3>
            <p slot="text">null-energiás lakás</p>
            <a href="/#/" class="btn btn-light">Tovább</a>
        </Card>
    </section>
    <section class="d-flex flex-column">
        <h3 class="p-5"> Projektjeink </h3>
        <Slidy {...mergedConfig.slider} let:item>
            <div class="slide h-100 d-flex flex-column justify-content-end align-items-center h-100">
                <article class="d-none d-md-flex flex-column align-items-center mb-5">
                    <h4 class="mt-2">{item.header}</h4>
                    <p>{item.text}</p>
                    <a href="/#" class="btn btn-primary mt-auto w-100">További referenciáink</a>
                </article>
            </div>
        </Slidy>
    </section>
    <section class="publications d-flex flex-column p-5">
        <h3> Rólunk írták </h3>
        <div class="d-flex flex-column flex-md-row">
            <a class="d-flex flex-column align-items-center" href="https://www.gsv.hu/hu/blog/tolunk-epult-oasis-residence-a-nullenergias-lakootthon">
                <img src="/images/publications/gsv-2020-11.jpeg" alt="GSV Magazin 2020-11">
                <h3>GSV Magazin</h3>
                <h5>2020 November / Tőlünk épült</h5>
            </a>
            <a class="d-flex flex-column align-items-center" href="https://www.gsv.hu/hu/blog/tolunk-epult-modern-nullenergias-tarsashaz-hajduszoboszlon">
                <img src="/images/publications/gsv-2019-06.jpeg" alt="GSV Magazin 2019-06">
                <h3>GSV Magazin</h3>
                <h5>2019 Június / Tőlünk épült</h5>
            </a>
        </div>
    </section>
    <section class="py-3">
        <Partners partners={mergedConfig.partners}></Partners>
    </section>
</section>