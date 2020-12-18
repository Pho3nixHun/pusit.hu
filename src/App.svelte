<script lang="ts">
	import Router from 'svelte-spa-router';
	import { wrap } from 'svelte-spa-router/wrap';
	import { _ } from 'svelte-i18n';
	import Bootstraper from './Bootstrapper'

    import { fade } from 'svelte/transition';
	import { Circle3 } from 'svelte-loading-spinners'
	import NavigationBar from './NavigationBar.svelte';
    import Footer from './Footer.svelte';
	import { onMount } from "svelte";

	export let url: string;
	const bootstraper = new Bootstraper(url);

	let media: typeof bootstraper.mediaqueries;
	
	const initializePromise = bootstraper.initialize();
	initializePromise.then(() => media = bootstraper.mediaqueries);

	onMount(() => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/service-worker.js');
		}
	})
</script>

<script context="module" lang="ts">

</script>

<svelte:head>
	<link rel="preload" as="style" href="bootstrap.css">
	<link rel="manifest" href="manifest.json" />
	<meta name="description" content="A Pusit kft. hivatalos weboldala">

	<meta name="apple-mobile-web-app-capable" content="yes">

	<link rel="apple-touch-icon" href="images/icons/apple-icon-180.png">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-2048-2732.jpg" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-2732-2048.jpg" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-1668-2388.jpg" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-2388-1668.jpg" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-1536-2048.jpg" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-2048-1536.jpg" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-1668-2224.jpg" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-2224-1668.jpg" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-1620-2160.jpg" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-2160-1620.jpg" media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-1284-2778.jpg" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-2778-1284.jpg" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-1170-2532.jpg" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-2532-1170.jpg" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-1125-2436.jpg" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-2436-1125.jpg" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-1242-2688.jpg" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-2688-1242.jpg" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-828-1792.jpg" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-1792-828.jpg" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-1242-2208.jpg" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-2208-1242.jpg" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-750-1334.jpg" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-1334-750.jpg" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-640-1136.jpg" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
	<link rel="apple-touch-startup-image" href="images/icons/apple-splash-1136-640.jpg" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)">
	<meta name="apple-mobile-web-app-status-bar" content="#000000" />
	<meta name="theme-color" content="#000000" />
	<link rel="stylesheet" href="bootstrap.css">
</svelte:head>


{#await initializePromise}
	<div class="d-flex align-items-center" in:fade={{ duration: 300 }}>
		<Circle3> </Circle3>
	</div>
{:then config}
	<div class="content d-flex flex-fill flex-column" in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }}>
		<NavigationBar bind:expanded={$media.lg} sticky>
			<img slot="brand" class="logo pl-2 py-3 py-md-3 px-md-1" src="{$_('company.logo')}" alt="{$_('company.name')}">
			<div slot="brand" class="title d-none flex-row d-xl-flex align-self-center align-items-center px-2">
				<h3> {$_('company.name')} </h3>
				<h6 class="pl-2 pl-0-md"> {$_('company.type')}</h6>
			</div>
			{#each config.menus as link}
				<a class="px-3 m-2" href="#{config.routes[link.route].path}" target="{link.target || '_self'}"> {$_(link.label)} </a>
			{/each}
		</NavigationBar>
		<section class="m-auto">
			<Router routes={{
				[config.routes.home.path]: wrap({
					asyncComponent: () => import('./views/Home.svelte'),
					props: config.routes.home.props
				}),
				[config.routes.services.path]: wrap({
					asyncComponent: () => import('./views/Services.svelte'),
					props: config.routes.services.props
				}),
				[config.routes.contact.path]: wrap({
					asyncComponent: () => import('./views/Contact.svelte'),
					props: config.routes.contact.props
				}),
				[config.routes.portfolio.path]: wrap({
					asyncComponent: () => import('./views/Portfolio.svelte'),
					props: config.routes.portfolio.props
				}),
				[config.routes.partners.path]: wrap({
					asyncComponent: () => import('./views/Partners.svelte'),
					props: config.routes.partners.props
				}),
				[config.routes.notFound.path]: wrap({
					asyncComponent: () => import('./views/NotFound.svelte'),
					props: config.routes.notFound.props
				})
			}}></Router>
		</section>
		<Footer {...config.footer}>

		</Footer>
	</div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}


<style lang="scss">
	:global(.debug) {
        *:hover, :global(*:hover) {
            outline: 3px dashed rgba(255,0,0,0.4);
        }
	}
	h1,h2,h3 {
		text-transform: uppercase;
	}
	.content {
		--color: black;
		--scrolled-color: black;
		--bg: transparent;
		--scrolled-background: white;
		--collapsed-bg: white;
	}
</style>