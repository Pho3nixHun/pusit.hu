<script lang="ts">
	import "bootstrap/dist/css/bootstrap.min.css";

	import Router from 'svelte-spa-router';
	import { wrap } from 'svelte-spa-router/wrap';
	import { _ } from 'svelte-i18n';
	import Bootstraper from './Bootstrapper'

    import { fade } from 'svelte/transition';
	import { Circle3 } from 'svelte-loading-spinners'
	import NavigationBar from './NavigationBar.svelte';
    import Footer from './Footer.svelte';

	export let url: string;
	const bootstraper = new Bootstraper(url);

	let media: typeof bootstraper.mediaqueries;
	
	const initializePromise = bootstraper.initialize();
	initializePromise.then(() => media = bootstraper.mediaqueries);
</script>


{#await initializePromise}
	<div class="d-flex align-items-center" in:fade={{ duration: 300 }}>
		<Circle3> </Circle3>
	</div>
{:then config}
	<div class="content d-flex flex-fill flex-column" in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }}>
		<NavigationBar bind:expanded={$media.lg} sticky>
			<img slot="brand" class="logo pl-2 py-3 py-md-3 px-md-1" src="{$_('company.logo')}" alt="{$_('company.name')}">
			<div slot="brand" class="title flex-column d-none flex-sm-row d-sm-flex flex-lg-column d-xl-flex align-self-center align-items-center px-2">
				<h3> {$_('company.name')} </h3>
				<h6 class="pl-2 pl-0-md"> {$_('company.type')}</h6>
			</div>
			{#each config.menus as link}
				<a class="px-3 m-2" href="#{config.routes[link.route].path}" target="{link.target || '_self'}"> {$_(link.label)} </a>
			{/each}
		</NavigationBar>
		<section>
			<Router routes={{
				[config.routes.home.path]: wrap({
					asyncComponent: () => import('./views/Home.svelte'),
					props: config.routes.home.props
				}),
				[config.routes.about.path]: wrap({
					asyncComponent: () => import('./views/About.svelte'),
					props: config.routes.about.props
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
		<Footer>

		</Footer>
	</div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}


<style lang="scss">
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