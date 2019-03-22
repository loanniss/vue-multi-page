<template>
    <div class="app-container">
        <el-form :model="search" :rules="rules" ref="searchForm" label-width="100px" class="filter-container">
            <el-form-item prop="level" label="区域级别:" class="filter-item">
                <el-input v-model="search.level" placeholder="请输入区域级别" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item prop="code" label="区域编码:" class="filter-item">
                <el-input v-model="search.code" placeholder="请输入区域编码" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item prop="date" label="日期:" label-width="80px" class="filter-item">
                <el-date-picker v-model="search.date" type="date" placeholder="请选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item prop="timeType" label="时间类型:" class="filter-item">
                <el-select v-model="search.timeType" placeholder="请选择时间类型" style="width: 200px;" clearable>
                    <el-option v-for="item in timeTypeOption" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item prop="timeDetail" v-if="search.timeType === '0'" label="具体时间点:" class="filter-item">
                <el-input v-model="search.timeDetail" placeholder="请输入具体时间点" style="width: 200px;"></el-input>
            </el-form-item>
            <el-button class="filter-item" @click="getAreaInfo()" style="margin-left: 20px;" :loading="loadingStatus" type="primary" icon="el-icon-search">查询</el-button>
        </el-form>
        <pre>{{areaInfo}}</pre>
    </div>
</template>

<script>
import api from '@/modules/portal/api'
export default {
    name: 'HotelSearch',
    data () {
        return {
            timeTypeOption: [{
                'label': '今日',
                'value': '0'
            },{
                'label': '未来',
                'value': '1'
            }],
            loadingStatus: false,
            rules: {
                level: [
                    { required: true, message: '请输入区域级别', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入区域编码', trigger: 'blur' }
                ],
                date: [
                    { required: true, message: '请选择日期', trigger: 'blur' }
                ],
                timeType: [
                    { required: true, message: '请选择时间类型', trigger: 'blur' }
                ],
                timeDetail: [
                    { required: true, message: '请输入具体时间点', trigger: 'blur' }
                ],
            },
            search: {
                level: '',
                code: '',
                date: '',
                timeType: '',
                timeDetail: ''
            },
            areaInfo: ''
        }
    },
    methods: {
        getAreaInfo () {
            this.$refs.searchForm.validate(async (valid) => {
                if (valid) {
                    this.loadingStatus = true
                    try {
                        const { data } = await api.hotelApi.getAreaInfo(this.search)
                        this.areaInfo = data
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
