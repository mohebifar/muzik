import fetch from 'isomorphic-fetch';
import { apiRoot } from 'config';
const methods = ['get', 'post'];
const singleton = Symbol();
const singletonEnforcer = Symbol();

export default class ApiClient {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw 'Cannot construct an object of ApiClient';
    }

    for (const method of methods) {
      this[method] = this.fetch.bind(this, method);
    }
  }

  static get client() {
    if (!this[singleton]) {
      this[singleton] = new ApiClient(singletonEnforcer);
    }

    return this[singleton];
  }

  static checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    return response.json().then(json => Promise.reject(json));
  }

  static parseJSON(response) {
    return response.json();
  }

  static prepareUrl(path) {
    return `${ apiRoot }/${ path }`;
  }

  fetch(method, url, { data, ...fetchOptions } = {}) {
    fetchOptions.headers = fetchOptions.headers || {};
    fetchOptions.headers['Accept'] = 'application/json';

    if (data) {
      fetchOptions.body = JSON.stringify(data);
      fetchOptions.headers['Content-Type'] = 'application/json';
    }

    return fetch(ApiClient.prepareUrl(url), {method, ...fetchOptions})
      .then(ApiClient.checkStatus)
      .then(ApiClient.parseJSON);
  }

  getArtistAlbums(artistId) {
    return this.get(`artists/${artistId}/albums?limit=3&offset=6&country=US`);
  }

  getAlbumSongs(albumId) {
    return this.get(`albums/${albumId}/tracks`);
  }
}

export const client = ApiClient.client;