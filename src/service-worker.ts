import * as routing from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

const HOUR = 60 * 60;
const DAY = HOUR * 24
const MONTH = 30 * DAY;

routing.registerRoute(
    /\.(?:css|js)$/,
    new StaleWhileRevalidate({
        cacheName: 'assets',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: MONTH
            })
        ]
    })
);
routing.registerRoute(
    /\.(?:json)$/,
    new StaleWhileRevalidate({
        cacheName: 'config',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: MONTH
            })
        ]
    })
);
routing.registerRoute(
    /\.(?:md)$/,
    new CacheFirst({
        cacheName: 'content',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: MONTH
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
                maxEntries: 10,
                maxAgeSeconds: MONTH
            })
        ]
    })
);


routing.registerRoute(
    /(?:^.*\.googleapis\.com\/.*|.*.gstatic.com\/.*$)/,
    new CacheFirst({
        cacheName: 'google',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 1000,
                maxAgeSeconds: MONTH
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
                maxAgeSeconds: MONTH
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
        maxEntries: 1000,
        maxAgeSeconds: HOUR
      })
    ]
  })  
)

routing.registerRoute(
  () => true,
  new StaleWhileRevalidate({
    cacheName: 'other',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: DAY
      })
    ]
  })  
)