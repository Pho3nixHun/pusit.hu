<script lang="ts">
	import { _ } from 'svelte-i18n';
	import {pop} from 'svelte-spa-router'
</script>
<style lang="scss">
	div {
		img {
			min-height: 50%;
		}
		text-align: center;
	}
</style>
<div class="d-flex flex-column align-items-center justify-items-center p-5">
	<img src="{$_('E404.img')}" alt="Page not found" width="50%" />
	<h3 class="mt-5">{$_('E404.title')}</h3>
	<h6 class="w-75">{$_('E404.text')}</h6>
	<button class="btn btn-primary mt-3" on:click={pop} alt="{$_('E404.button.alt')}">{$_('E404.button.text')}</button>
</div>