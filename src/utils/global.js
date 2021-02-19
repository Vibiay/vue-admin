import { MessageBox } from 'element-ui';
export default{
    install(Vue,option){
        Vue.prototype.confirm =(params) =>{
            MessageBox.confirm(params.text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        }
    }
}