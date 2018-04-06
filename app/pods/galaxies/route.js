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
      console.error(e);
    }

    try {
      this.debug('messaging the service worker');
      const headers = { 'x-service-worker': 'milky-way' };
      const result = await ajax.request('galaxies', { headers });
      this.debug('result: %o', result);
    } catch (e) {
      console.error('bad boy', e);
    }

    this.debug('finished loading galaxies, %d', Date.now());
  },
});
