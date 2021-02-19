<template>
  <el-dialog title="新增" :visible.sync="dialogInfo" @close = "close" width="580px">
      <el-form :model="form">
      <el-form-item label="类型：" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="formLabelWidth">
        <el-input v-model="form.name"  placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="概况：" :label-width="formLabelWidth">
        <el-input v-model="form.name" type="textarea"  placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="danger" @click="dialogFormVisible = false" >确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { reactive, ref ,watch } from "@vue/composition-api";
export default {
    name:'dialogInfo',
    setup(props,{root,emit}){
        const dialogTableVisible = ref(false)
        // 信息弹窗标记
        const dialogInfo = ref(true)
        const form  = reactive({
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        })
        const formLabelWidth = ref('70px')
        // watch
        watch(()=>{
          dialogInfo.value = props.flag
        })
        // 关闭弹窗的方法
        const close = ()=>{
          dialogInfo.value = false;
          emit("update:flag",false)
          // root.$emit('close',false)
        }
        
        
        return{
            dialogTableVisible,
            form,
            formLabelWidth,
            dialogInfo,
            close
        }
    },
    props:{
      flag:{
        type:Boolean,
        default:false
      }
    },
}
</script>