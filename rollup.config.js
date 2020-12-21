import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import copy from 'rollup-plugin-copy';
import replace from 'rollup-plugin-replace';
import sass from 'rollup-plugin-sass';


const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--host', '0.0.0.0', '--dev', '--gzip'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default [
	{
		input: 'src/service-worker.ts',
		output: {
			sourcemap: true,
			format: 'iife',
			file: 'public/build/service-worker.js',
			inlineDynamicImports : true
		},
		plugins: [
			replace({
				'process.env.NODE_ENV': JSON.stringify('production'),
			}),
			commonjs(),
			typescript({
				sourceMap: !production,
				inlineSources: !production
			}),
			resolve({
				browser: true,
			}),
		]
	},
	{
		input: ['src/main.ts'],
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'app',
			file: 'public/build/bundle.js',
			inlineDynamicImports : true
		},
		plugins: [
			svelte({
				preprocess: sveltePreprocess({
					postcss: true,
					sass: true
				}),
				compilerOptions: {
					// enable run-time checks when not in production
					dev: !production
				},
				onwarn: (warning, handler) => {
					const { code, frame } = warning;
					if (code === "css-unused-selector")
						return;

					handler(warning);
				}
			}),
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css({
				output: 'bundle.css'
			}),
			/*
			copy({
				targets: [
					{ src: 'node_modules/bootstrap/dist/css/bootstrap.min.css.map', dest: 'public/build/'}
				]
			}),*/
			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration -
			// consult the documentation for details:
			// https://github.com/rollup/plugins/tree/master/packages/commonjs
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),
			typescript({
				sourceMap: !production,
				inlineSources: !production
			}),
			// In dev mode, call `npm run start` once
			// the bundle has been generated
			!production && serve({ host: '0.0.0.0' }),

			// Watch the `public` directory and refresh the
			// browser on changes when not in production
			!production && livereload('public'),

			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production && terser()
		],
		watch: {
			clearScreen: false
		}
	}/*,
	{
		input: 'src/dev.ts',
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'app',
			file: 'public/build/dev-bundle.js',
			inlineDynamicImports : true
		},
		plugins: [
			svelte({
				preprocess: sveltePreprocess(),
				compilerOptions: {
					// enable run-time checks when not in production
					dev: !production
				}
			}),
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css({ output: 'dev-bundle.css' }),

			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration -
			// consult the documentation for details:
			// https://github.com/rollup/plugins/tree/master/packages/commonjs
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),
			typescript({
				sourceMap: !production,
				inlineSources: !production
			})
		],
		watch: {
			clearScreen: false
		}
	}*/
];
