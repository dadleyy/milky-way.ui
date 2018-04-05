import Route from '@ember/routing/route';
import debugLogger from 'ember-debug-logger';

export default Route.extend({
  debug: debugLogger(),
  model() {
    this.debug('loading galaxies, %d', Date.now());
  },
});
