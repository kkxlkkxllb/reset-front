import { EventBus } from '@/libs/event-bus.js'
import Vue from 'vue'
import {
  RESP_OK_CODE
} from '@/libs/constant'

export const $api = (method, url, params = {}) => {
  EventBus.$emit('load:start')
  const data = method === 'get' ? { params } : params
  return new Promise((resolve, reject) => {
    Vue.axios[method](url, data).then(resp => {
      if (resp.data.meta.code === RESP_OK_CODE) {
        resolve(resp.data)
      } else {
        reject(resp.data)
      }
      EventBus.$emit('load:end')
    }).catch(err => reject(err))
  })
}

export const $get = (url, params = {}) => $api('get', url, params)

export const $post = (url, params = {}) => $api('post', url, params)

export const $postForm = (url, formData) => {
  EventBus.$emit('load:start')
  return new Promise((resolve, reject) => {
    Vue.axios({
      method: 'POST',
      url: url,
      data: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((resp) => {
      if (resp.data.status === RESP_OK_CODE) {
        resolve(resp.data)
      } else {
        reject(resp.data)
      }
      EventBus.$emit('load:end')
    }).catch(err => reject(err))
  })
}
