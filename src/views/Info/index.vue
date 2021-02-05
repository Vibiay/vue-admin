<template>
  <div id="info">
      <el-form>
        <el-row :gutter="10">
        <el-col :span="4">
            <el-form-item label="类型">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="7">
            <el-form-item label="日期">
                <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>

            </el-form-item>
        </el-col>
        <el-col :span="3">
            <el-form-item label="关键字">
                <el-select v-model="searchValue" placeholder="请选择" style="width:130px">
                    <el-option
                    v-for="item in searchOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="3">
            <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="2">
            <el-button type="danger" size="small" style="width:100px;">搜索</el-button>
        </el-col>
        <el-col :span ="3"></el-col>
        <el-col :span="2">
            <el-button type="danger" size="small" class="pull-right" style="width:100px;">新增</el-button>
        </el-col>
        
        </el-row>
    </el-form>
  </div>
</template>
<script>
import {reactive,ref} from "@vue/composition-api";
export default {
    name:'info',
    setup(props,{root}){
        const  options = reactive([{
          value: '选项1',
          label: '国际信息'
        }, {
          value: '选项2',
          label: '国内信息'
        }, {
          value: '选项3',
          label: '行业信息'
        }])
        const searchOption = reactive([{
            value:'id',label:'ID'
        },{
            value:'title',label:'标题'
        }])
        const value = ref('')
        const value1 = ref('')
        const searchValue = ref('ID')
        return{
            options,value,
            value1,searchOption,searchValue
        }
    }
};
</script>
<style lang="scss" scoped>
.info {
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
</style>