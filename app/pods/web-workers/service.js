import Service from '@ember/service';
import { get } from '@ember/object';
import config from 'milky-way/config/environment';

export default Service.extend({
  async load(name) {
    const root = get(config, 'webworkers.location');
    const url = [root, name].join('/') + '.js';
    return new Worker(url);
  },
});
