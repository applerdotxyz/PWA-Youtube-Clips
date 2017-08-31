const CACHE_VERSION = 2;
const CURRENT_CACHES = {
  prefetch: `prefetch-cache-v${CACHE_VERSION}`,
};

self.addEventListener('install', (event) => {
  const urlsToPrefetch = [
    './',
    '/',
    'main.*.js',
    'main.*.css',
    'icon.jpg',
    'views/App.js',
    'views/Layout.js',
    'views/clips/AdminActionCard.js',
    'views/clips/ClipsListSection.js',
    'views/clips/index.js',
    'views/clips/style.css',
  ];

  // All of these logging statements should be visible via the "Inspect" interface
  // for the relevant SW accessed via chrome://serviceworker-internals
  console.log('Handling install event. Resources to prefetch:', urlsToPrefetch);
  self.skipWaiting();
  event.waitUntil(
    caches.open(CURRENT_CACHES.prefetch).then((cache) => cache.addAll(urlsToPrefetch))
  );
});

self.addEventListener('activate', (event) => {
  // Delete all caches that aren't named in CURRENT_CACHES.
  // While there is only one cache in this example, the same logic will handle the case where
  // there are multiple versioned caches.
  const expectedCacheNames = Object.keys(CURRENT_CACHES).map((key) => CURRENT_CACHES[key]);

  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
        cacheNames.map((cacheName) => {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            // If this cache name isn't present in the array of "expected" cache names, then delete it.
            console.log('Deleting out of date cache:', cacheName);

            return caches.delete(cacheName);
          }
        })
      ))
    );
});

// @todo :: See if any of below code is redundant
self.addEventListener('fetch', (event) => {
  console.log('Handling fetch event for', event.request.url);

  if (event.request.headers.get('range')) {
    const pos =
    Number(/^bytes\=(\d+)\-$/g.exec(event.request.headers.get('range'))[1]);

    console.log('Range request for', event.request.url,
      ', starting position:', pos);
    event.respondWith(
      caches.open(CURRENT_CACHES.prefetch).
      then((cache) => cache.match(event.request.url)).
      then((res) => {
        if (!res) {
          return fetch(event.request).
          then((res) => res.arrayBuffer());
        }

        return res.arrayBuffer();
      }).then((ab) => new Response(
          ab.slice(pos),
        {
          status: 206,
          statusText: 'Partial Content',
          headers: [
              // ['Content-Type', 'video/webm'],
            ['Content-Range', `bytes ${pos}-${
                ab.byteLength - 1}/${ab.byteLength}`]],
        })));
  } else {
    console.log('Non-range request for', event.request.url);
    event.respondWith(
    // caches.match() will look for a cache entry in all of the caches available to the service worker.
    // It's an alternative to first opening a specific named cache and then matching on that.
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('Found response in cache:', response);

        return response;
      }
      console.log('No response found in cache. About to fetch from network...');
      // event.request will always have the proper mode set ('cors, 'no-cors', etc.) so we don't
      // have to hardcode 'no-cors' like we do when fetch()ing in the install handler.

      return fetch(event.request).
      then((response) => {
        console.log('Response from network is:', response);

        return response;
      }).catch((error) => {
        // This catch() will handle exceptions thrown from the fetch() operation.
        // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
        // It will return a normal response object that has the appropriate error code set.
        console.error('Fetching failed:', error);

        throw error;
      });
    })
    );
  }
});
