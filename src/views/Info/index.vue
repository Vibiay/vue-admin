<template>
  <div id="info">
    <el-form>
      <el-row :gutter="10" class="form-header">
        <el-col :span="4">
          <el-form-item label="类型">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
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
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="关键字">
            <el-select
              v-model="searchValue"
              placeholder="请选择"
              style="width: 130px"
            >
              <el-option
                v-for="item in searchOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-input v-model="value" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" size="small" style="width: 100px"
            >搜索</el-button
          >
        </el-col>
        <el-col :span="3"></el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            size="small"
            class="pull-right"
            style="width: 100px"
            @click = "dialog_info = true"
            >新增</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格部分 -->
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="45"> </el-table-column>
        <el-table-column label="标题" width="832">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column prop="value" label="类别" width="130">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="240">
        </el-table-column>
        <el-table-column prop="user" label="管理人" width="110">
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="success" @click="dialog_info = true">编辑</el-button>
          <el-button type="danger" @click="deleteItem">删除</el-button>
        </el-table-column>
      </el-table>
      <!-- 表单脚本 -->
      <el-row class="footer">
        <el-col :span="12">
          <el-button size="medium" @click="deleteAll">批量删除</el-button>
        </el-col>
        <el-col :span="12">
          <el-pagination
            class="pull-right"
            background
            :page-sizes="[2, 4, 6, 8]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="200"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </el-form>
    <!-- 新增弹窗 -->
    <DialogInfo :flag.sync = "dialog_info" />
  </div>
</template>
<script>
import { reactive, ref } from "@vue/composition-api";
import DialogInfo from './dialog/info'
export default {
  name: "info",
  components:{DialogInfo},
  setup(props, { root }) {
    const options = reactive([
      {
        value: "选项1",
        label: "国际信息",
      },
      {
        value: "选项2",
        label: "国内信息",
      },
      {
        value: "选项3",
        label: "行业信息",
      },
    ]);
    const searchOption = reactive([
      {
        value: "id",
        label: "ID",
      },
      {
        value: "title",
        label: "标题",
      },
    ]);
    const tableData = reactive([
      {
        title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
        value: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "管理员",
      },
      {
        title:
          "习近平在中央政协工作会议暨庆祝中国人民政治协商会议成立70周年大会上发表重要讲话",
        value: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "张三",
      },
      {
        title: '基里巴斯与台当局"断交" 系蔡当局上台后断交第7国',
        value: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "李四",
      },
      {
        title: "不选了！纽约市长白思豪宣布退出2020美国大选",
        value: "国内信息",
        date: "2019-09-10 19:31:31",
        user: "王五",
      },
    ]);
    const multipleSelection = reactive([]);
    const value = ref("");
    const value1 = ref("");
    const searchValue = ref("ID");
    const dialog_info = ref(false);
    // 方法
    const handleSelectionChange = (val) => {
      root.multipleSelection = val;
    };
    const deleteAll = ()=>{
      root.confirm({
        text:'此操作将永久删除全部文件, 是否继续?'
      })
    };
    const deleteItem = ()=>{
       root.confirm({
        text:'此操作将永久删除该文件, 是否继续?'
      })
    }
    return {
      options,
      tableData,
      multipleSelection,
      value,
      value1,
      searchOption,
      searchValue,
      dialog_info,
      // 方法
      handleSelectionChange,
      deleteAll,
      deleteItem
    };
  },
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
.footer{
    margin-top:30px;
  }
.form-header{
  margin-bottom:30px;
}
</style>