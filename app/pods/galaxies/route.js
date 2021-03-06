import Route from '@ember/routing/route';
import debugLogger from 'ember-debug-logger';
import { inject as service } from '@ember/service';

export default Route.extend({
  debug: debugLogger(),
  workers: service('web-workers'),
  ajax: service(),

  async model() {
    this.debug('loading galaxies, %d', Date.now());
    const workers = this.get('workers');
    const ajax = this.get('ajax');

    try {
      await workers.load('serializers/galaxies');
    } catch (e) {
      this.debug('errored while loading web worker: %s', e.message);
    }

    try {
      this.debug('messaging the service worker');
      const headers = { 'x-service-worker': 'milky-way' };
      const result = await ajax.request('galaxies', { headers });
      this.debug('result: %o', result);
    } catch (e) {
      this.debug('errored while loading galaxies: %s', e.message);
    }

    this.debug('finished loading galaxies, %d', Date.now());
  },
});
