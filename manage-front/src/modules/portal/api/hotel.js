import AxiosWrap from '@/modules/portal/utils/request'

const API_Hotel_Info = '/api/v1/monit/base_data/detail'
const API_HOTEL_AREA_INFO = '/api/v1/monit/stat_cal_data/{level}/{code}'
export default {
    // 获取酒店基本数据
    getHotelInfo: async (params) => {
        let res = await AxiosWrap.send_pt('GET', API_Hotel_Info, { params: params })
        return res
    },
    // 获取区域数据
    getAreaInfo: async (params) => {
        let res = await AxiosWrap.send_pt('GET', API_HOTEL_AREA_INFO, { params: params })
        return res
    },
}