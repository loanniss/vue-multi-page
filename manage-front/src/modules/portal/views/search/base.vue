<template>
    <div class="app-container">
        <el-form :model="search" :rules="rules" ref="searchForm" label-width="100px" class="filter-container">
            <el-form-item prop="hotelCode" label="酒店编码:" class="filter-item">
                <el-input v-model="search.hotelCode" placeholder="请输入酒店编码" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item prop="type" label="数据类型:" class="filter-item">
                <el-select v-model="search.type" placeholder="请选择数据类型" style="width: 200px;" clearable>
                    <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item prop="date" label="日期:" label-width="80px" class="filter-item">
                <el-date-picker v-model="search.date" type="date" placeholder="请选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-button class="filter-item" @click="getHotelInfo()" style="margin-left: 20px;" :loading="loadingStatus" type="primary" icon="el-icon-search">查询</el-button>
        </el-form>
        <pre>{{hotelInfo}}</pre>
    </div>
</template>

<script>
import api from '@/modules/portal/api'
export default {
    name: 'HotelSearch',
    data () {
        return {
            loadingStatus: false,
            rules: {
                hotelCode: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择数据类型', trigger: 'blur' }
                ],
                date: [
                    { required: true, message: '请选择日期', trigger: 'blur' }
                ],
            },
            search: {
                hotelCode: '',
                type: '',
                date: ''
            },
            typeOptions: ['marketRoomPrice','eventRoomPrice',"memberRoomPrice","baseCalData","otaRoomPrice","futureMarketRoomPrice","futureEventRoomPrice","futureMemberRoomPrice","futureBaseCalData","futureOtaRoomPrice"],
            hotelInfo: ''
        }
    },
    methods: {
        getHotelInfo () {
            this.$refs.searchForm.validate(async (valid) => {
                if (valid) {
                    this.loadingStatus = true
                    try {
                        const { data } = await api.hotelApi.getHotelInfo(this.search)
                        console.log(data)
                        this.hotelInfo = data;
                    } catch (e) {
                        
                    }
                    this.loadingStatus = false
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.app-container{
    padding: 20px;
}
.filter-container {
  padding-bottom: 10px;

  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 20px;
  }
}

</style>
