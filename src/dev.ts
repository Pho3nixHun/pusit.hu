import App from './Dev.svelte';

const app = new App({
	target: document.body,
	props: {
        title: 'Svelte component development tool',
        favicon: '/assets/images/icons/favicon.webp'
	}
});

export default app;