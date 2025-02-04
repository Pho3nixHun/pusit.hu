<script context="module" lang="ts">
    import type { GoogleMapProperties } from './components/GoogleMap.svelte';
    import type GoogleMapMarker from './components/GoogleMapMarker.svelte';
    
    export type GoogleOptions = {
        maps: {
            apiKey: string,
            options: GoogleMapProperties,
            markers: GoogleMapMarker[]
        }
    }
    export type FooterProperties = {
        copyright: string,
        socials: Social[],
        article: string,
        legals: Link[],
        links: Link[],
        google: GoogleOptions
    }
    export type Social = {
        icon: string,
        href: string,
        class?: string,
        target?: string
    }
    export type Link = {
        label: string,
        href: string,
        target?: string
    }
</script>

<script lang="ts">
    import * as Icons from 'svelte-awesome/icons';
    import Icon from 'svelte-awesome';
	import { _ } from 'svelte-i18n';

    import GoogleMap from './components/GoogleMap.svelte';
    import Marker from './components/GoogleMapMarker.svelte';
    import CustomMapStyle from './components/GoogleMapStyle.svelte';
    import mapStyle from './wy.mapstyle.json';

    export let copyrightLabel: string = '', 
        socials: Social[] = [], 
        legals: Link[] = [],
        links: Link[] = [],
        google: GoogleOptions;
</script>

<style lang="scss">
    .site-footer {
        --color: #aaa;
        --background: #26272b;
        --title-color: #fff;
        --hover-color: #3366cc;
        background-color: var(--background);
        padding: 45px 0 20px;
        font-size: 15px;
        line-height: 24px;
        color: var(--color);
    }
    .site-footer hr {
        border-top-color: #bbb;
        opacity: 0.5;
    }
    .site-footer h6 {
        color: #fff;
        font-size: 16px;
        text-transform: uppercase;
        margin-top: 5px;
        letter-spacing: 2px;
    }
    .site-footer a {
        color: var(--color);
    }
    .site-footer a:hover {
        color: var(--hover-color);
        text-decoration: none;
    }
    .footer-links {
        padding-left: 0;
        list-style: none;
    }
    .footer-links li {
        display: block;
    }
    .footer-links a {
        color: var(--color);
    }
    .footer-links a:active,
    .footer-links a:focus,
    .footer-links a:hover {
        color: var(--hover-color);
        text-decoration: none;
    }
    .site-footer .social-icons {
        text-align: right;
    }
    .site-footer .social-icons a {
        width: 40px;
        height: 40px;
        line-height: 35px;
        margin-left: 6px;
        margin-right: 0;
        border-radius: 100%;
        background-color: #33353d;
    }
    .copyright-text {
        margin: 0;
    }
    @media (max-width: 991px) {
        .site-footer [class^="col-"] {
            margin-bottom: 30px;
        }
    }
    @media (max-width: 767px) {
        .site-footer {
            padding-bottom: 0;
        }
        .site-footer .copyright-text,
        .site-footer .social-icons {
            text-align: center;
        }
    }
    .social-icons {
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;
    }
    .social-icons li {
        display: inline-block;
        margin-bottom: 4px;
    }
    .social-icons a {
        background-color: #eceeef;
        color: #818a91;
        font-size: 16px;
        display: inline-block;
        line-height: 44px;
        width: 44px;
        height: 44px;
        text-align: center;
        margin-right: 8px;
        border-radius: 100%;
        -webkit-transition: all 0.2s linear;
        -o-transition: all 0.2s linear;
        transition: all 0.2s linear;
    }
    .social-icons a:active,
    .social-icons a:focus,
    .social-icons a:hover {
        color: #fff;
        background-color: #29aafe;
    }
    .social-icons a.facebook:hover {
        background-color: #3b5998;
    }
    .social-icons a.gmail:hover {
        background-color: #bb001b;
    }
    .social-icons a.linkedin:hover {
        background-color: #007bb6;
    }
    .social-icons a.pinterest:hover {
        background-color: #bd081c;
    }
    .site-footer :global(.map) {
        height: 200px;
    }
</style>

<footer class="site-footer {$$props.class}">
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <GoogleMap class="map" apiKey={google.maps.apiKey} options={google.maps.options} let:map>
                    <CustomMapStyle map={map} value={mapStyle}></CustomMapStyle>
                    {#each google.maps.markers as markerProps}
                        <Marker map={map} {...markerProps} />
                    {/each}
                </GoogleMap>
            </div>

            <div class="col-xs-6 col-md-3">
                <h6>{$_('footer.legalsTitle')}</h6>
                <ul class="footer-links">
                    {#each legals as link}
                        <li>
                            <a href="{link.href}" target="{link.target ?? '_self'}">{$_(link.label)}</a>
                        </li>
                    {/each}
                </ul>
            </div>

            <div class="col-xs-6 col-md-3">
                <h6>{$_('footer.linksTitle')}</h6>
                <ul class="footer-links">
                    {#each links as link}
                        <li>
                            <a href="{link.href}" target="{link.target ?? '_self'}">{$_(link.label)}</a>
                        </li>
                    {/each}
                </ul>
            </div>
            {#if $$slots.default}
                <div class="col-12">
                    <slot></slot>
                </div>
            {/if}
        </div>
        <hr />
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-sm-6 col-xs-12">
                <p class="copyright-text">
                    {$_(copyrightLabel)}
                </p>
            </div>

            <div class="col-md-4 col-sm-6 col-xs-12">
                <ul class="social-icons">
                    {#each socials as social}
                        <li>
                            <a 
                                class="{social.class ?? social.icon}" 
                                target="{social.target ?? '_blank'}"
                                href="{social.href}"
                                rel="noreferrer"
                                alt="{social.icon} icon" 
                                aria-label="{social.icon}">
                                <Icon data={Icons[social.icon]} scale=1.5/>
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</footer>
