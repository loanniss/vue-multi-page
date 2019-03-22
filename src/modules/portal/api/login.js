import AxiosWrap from '@/modules/portal/utils/request'

const API_USER_LOGIN = '/api/v1/monit/sessions/login'
export default {
  // 登录
  login: async (params) => {
    let res = await AxiosWrap.send_pt('post', API_USER_LOGIN, { data: params })
    return res
  }
}
