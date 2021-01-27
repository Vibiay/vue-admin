<template>
    <div id="nav-wrap">
      <img class="imgs" src="@/assets/logo.png">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse='isCollapse' background-color="transparent" text-color = "#fff" active-text-color="#fff" router>
      <template v-for="(item,index) in routes">
      <el-submenu v-if="!item.hidden"  :key="item.id" :index="index+''">
          <!-- 一级菜单 -->
        <template slot="title">
          <svg-icon :iconClass = "item.meta.icon" :className = "item.meta.icon" />
          <span>{{item.meta.name}}</span>
        </template>
        <!-- 子级菜单 -->
        <el-menu-item v-for="subItem in item.children" :index="subItem.path+''" :key="subItem.id">{{subItem.meta.name}}</el-menu-item>
      </el-submenu>
      </template>
    </el-menu>
    <svg-icon />
    </div>
</template>
<script>
import {
  reactive,
  ref,
  isRef,
  toRefs,
  onMounted,
  watch,
  computed
} from "@vue/composition-api";
import SvgIcon from '../../../icons/SvgIcon.vue';
export default {
  components: { SvgIcon },
    name:'navs',
    setup(props,{root}){
    /**
     * 数据*/    
        const routes = reactive(root.$router.options.routes)
        const isCollapse = computed(()=> root.$store.state.app.isCollapse)
    
        return{
            routes,isCollapse
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../styles/config.scss';
#nav-wrap{
    width:$navMenu;
    height:100vh;
    position: fixed;
    left:0;
    top:0;
    background-color:#344a5f;
    @include webkit(transition,all .3s case 0s);
    .imgs{
      width:92px;

      margin:28px auto;
    }
    svg{
      font-size:20px;
      margin-right:10px;
    }
}
.open{
  #nav-wrap{
    width:$navMenu
  }
}
.close{
  #nav-wrap{
    width:$navMenuL;
  }
  #nav-wrap img{width:60%}
}
  
</style>