import * as routing from 'workbox-routing';
import * as Strategies from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

let {CacheFirst, NetworkFirst, StaleWhileRevalidate} = Strategies;
const DEBUG = true;

if (DEBUG) {
    console.warn('Service Worker started in debug mode.')
    CacheFirst = NetworkFirst
    StaleWhileRevalidate = NetworkFirst
} else {
    console.debug('Service Worker started in normal mode.')
}

routing.registerRoute(
    /\.(?:css|js)$/,
    new StaleWhileRevalidate({
        cacheName: 'assets',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: 31536000
            })
        ]
    })
);

routing.registerRoute(
    /\.(?:md|json)$/,
    new CacheFirst({
        cacheName: 'content',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: 31536000
            })
        ]
    })
);

routing.registerRoute(
    /\.(?:woff2|woff|ttf)$/,
    new CacheFirst({
        cacheName: 'fonts',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: 31536000
            })
        ]
    })
);

routing.registerRoute(
    /\.(?:png|jpg|jpeg|gif|bmp|webp|svg|ico)$/,
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: 31536000
            })
        ]
    })
);

routing.registerRoute(
  /\.(?:html|htm|js|map)$/,
  new StaleWhileRevalidate({
    cacheName: 'app',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60*60,
        maxEntries: 1000
      })
    ]
  })  
)