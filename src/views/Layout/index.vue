<template>
    <div id="layout" :class="[menuStatus ? 'close' : 'open']">
        <LayoutHeader />
        <LayoutMain />
        <LayoutNav />
    </div>
</template>
<script>
import { computed } from '@vue/composition-api'
import LayoutHeader from './Components/Header'
import LayoutMain from './Components/Main'
import LayoutNav from './Components/Nav'
export default {
    name:'layout',
    setup(props,{root}){
        const menuStatus = computed(()=> root.$store.state.app.isCollapse)
        return {
            menuStatus
        }
    },
    components:{
        LayoutHeader,LayoutMain,LayoutNav
    }
}
</script>
<style lang="scss" scoped>
#layout{
    background-color:#f7f7f7;
}
</style>