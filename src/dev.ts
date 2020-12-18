import App from './Dev.svelte';

const app = new App({
	target: document.body,
	props: {
        title: 'Svelte component development tool',
        favicon: '/favicon.png'
	}
});

export default app;