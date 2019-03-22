import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/modules/portal/utils/auth'
// 扩展库
import {restfulFormat} from './stringExtend'
import tool from './tool'

let BASE_PORTAL_PATH = process.env.BASE_PORTAL_PATH

export default {
  send_pt: function (mth, url, params) {
    params = params || {}
    params.method = mth
    return axios(
      this.mergeParams(BASE_PORTAL_PATH + url, params)
    )
  },
  mergeParams: function (url, params) {
    let defaultParams = {
      headers: {
        'Content-type': 'application/json',
        'Access-token': getToken() || '',
      },
      timeout: 10000,
      url: restfulFormat(url, params.data || params.params)
    }

    let headers = Object.assign({}, defaultParams.headers, params.headers)

    let newParams = Object.assign({}, defaultParams, params)

    newParams.headers = headers
    if (newParams.method === 'get') {
      if (newParams.params === undefined) { newParams.params = {} }
      let appendParams = newParams.params
      newParams.params = tool.camelizeObj(appendParams)
    } else if (newParams.method === 'post') {
      if (newParams.data === undefined) { newParams.data = {} }
      let appendParams = newParams.data
      newParams.data = tool.camelizeObj(appendParams)
    }
    console.log(newParams)
    return newParams
  }
}

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做某事，比如说 设置loading动画显示
  return config
}, error => {
  // 请求错误时做些事
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    console.log(res)
    if (res.meta.code !== "10000") {
      Message({
        message: res.meta.message,
        type: 'error',
        duration: 5 * 1000
      })

      // 10003:未登录;
      if (res.meta.code === "10003") {
        MessageBox.confirm(
          res.meta.message,
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response
    }
}, error => {
  console.log('err' + error) // for debug
  Message({
    message: error.meta.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})