import { dictionary, locale, _ } from 'svelte-i18n';
import objectAssignDeep from 'object-assign-deep';
import watchMedia from 'svelte-media';
import type { Readable } from 'svelte/store';
import type FooterProperties from './Footer.svelte';

export namespace RouterConfig {
	export type Route = {
		path: string,
		path2: string,
		props: any
	}
	export type Keys = 'home' | 'about' | 'contact' | 'portfolio' | 'partners' | 'services' | 'notFound';
	export type Options = {
		[key in Keys]: Route
	}
}
export type MenuItem = {
	route: RouterConfig.Keys,
	target: '_self' | '_blank' | '_parent' | '_top',
	label: string
}
export enum i18nLanguages {
	'ar'= 'ar',
	'az'= 'az',
	'be'= 'be',
	'bg'= 'bg',
	'bn'= 'bn',
	'bs'= 'bs',
	'ca'= 'ca',
	'cs'= 'cs',
	'da'= 'da',
	'de'= 'de',
	'en'= 'en',
	'es'= 'es',
	'et'= 'et',
	'fa'= 'fa',
	'fi'= 'fi',
	'fr'= 'fr',
	'gl'= 'gl',
	'el'= 'el',
	'he'= 'he',
	'hi'= 'hi',
	'hr'= 'hr',
	'hu'= 'hu',
	'hy'= 'hy',
	'it'= 'it',
	'id'= 'id',
	'ja'= 'ja',
	'ka'= 'ka',
	'kk'= 'kk',
	'ko'= 'ko',
	'ky'= 'ky',
	'lt'= 'lt',
	'lv'= 'lv',
	'mk'= 'mk',
	'mn'= 'mn',
	'ms'= 'ms',
	'nb'= 'nb',
	'nl'= 'nl',
	'nn'= 'nn',
	'pl'= 'pl',
	'pt'= 'pt',
	'ro'= 'ro',
	'ru'= 'ru',
	'sk'= 'sk',
	'sl'= 'sl',
	'sr'= 'sr',
	'sv'= 'sv',
	'th'= 'th',
	'tr'= 'tr',
	'uk'= 'uk',
	'ur'= 'ur',
	'uz'= 'uz',
	'zh'= 'zh',
	'vi'= 'vi',
}
export type LanguageResource = {
	[key: string]: string | LanguageResource
}
export type Config = {
	routes: RouterConfig.Options,
	menus: MenuItem[],
	i18n: {
		languages: {
			[key in i18nLanguages]: string
		},
		default?: i18nLanguages
	},
	mediaqueries: {
		xs?: string,
		sm?: string,
		md?: string,
		lg?: string,
		xl?: string
	},
	footer: FooterProperties
}

type Mediaqueries = {
	[key in keyof Config['mediaqueries']]: boolean
}

// TODO: Remove
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default class Bootstraper {
    static async fetchJson(url: string) {
        const data = await fetch(url);
		return data.json();
    }

    static getLocale(fallback = i18nLanguages.en): i18nLanguages {
        const desiredLocale = navigator.languages.find(ln => ln in i18nLanguages);
		const savedLocale = localStorage.getItem('locale');
		return i18nLanguages[savedLocale] ?? i18nLanguages[desiredLocale] ?? fallback;
    }
    static saveLocale(val: i18nLanguages) {
        localStorage.setItem('locale', val);
    }

    public config: Config;
	
	public mediaqueries: Readable<Mediaqueries>;

    constructor(public readonly configUrl: string) {
    }

    async fetchConfig(): Promise<Config> {
        return Bootstraper.fetchJson(this.configUrl);
    }

    async setLocale(config: Config) {
        const desiredLocal = Bootstraper.getLocale(config.i18n.default);
        const selectedLocale = await Bootstraper.fetchJson(config.i18n.languages[desiredLocal]).catch(ex => false);
		const fallbackLocale = selectedLocale ?? await Bootstraper.fetchJson(config.i18n.languages[config.i18n.default]).catch(ex => false);
		if (selectedLocale === false) {
			console.warn(`Not able to fetch selected locale '${desiredLocal}' at ${config.i18n.languages[desiredLocal]}`);
			if (fallbackLocale === false) {
				throw new Error(`Not able to fetch neither selected (${desiredLocal} at ${config.i18n.languages[desiredLocal]}), nor fallback (${config.i18n.default} at ${config.i18n.languages[config.i18n.default]}) locale.`)
			}
		}
		dictionary.set({
			[desiredLocal]: selectedLocale ?? fallbackLocale
		});
		locale.set(desiredLocal);
    }

    private applyDefaults(config: Config, defaultsKey = 'defaults') {
		for(let key in config.routes) {
			if (key !== defaultsKey) {
				config.routes[key] = objectAssignDeep({}, config.routes[defaultsKey], config.routes[key]);
			}
		}
    }

	initializeMediaQueriesStore(config: Config) {
		this.mediaqueries = watchMedia(config.mediaqueries);
	}

    async initialize(): Promise<Config> {
        this.config = await this.fetchConfig();
		this.applyDefaults(this.config);
		this.initializeMediaQueriesStore(this.config);
        //await delay(500);
        await this.setLocale(this.config);
		return this.config;
    }
}