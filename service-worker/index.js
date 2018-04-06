function defer() {
  const result = { };
  result.promise = new Promise((resolve, reject) => Object.assign(result, { resolve, reject }));
  return result;
}

function resolveAfter(result, time) {
  const { promise, resolve } = defer();

  setTimeout(resolve.bind(null, result), time);

  return promise;
}

function resolve(result) {
  const { resolve, promise } = defer();
  resolve(result);
  return promise;
}

self.addEventListener('fetch', function(event) {
  if (event.request.headers.get('x-service-worker') !== 'milky-way') {
    return;
  }

  const result = {
    name: 'milky way',
    times: [],
  };

  const response = new Response(JSON.stringify(result));
  return event.respondWith(resolveAfter(response, 5e3));
});
