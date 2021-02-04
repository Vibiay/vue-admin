<template>
    <div id="header-wrap">
        <div class="pull-left head-icon" @click="navMenuState" ><svg-icon iconClass = "menu" className = "menu" /></div>
        <div class="pull-right">
            <div class="user-info pull-left">{{username}}</div>
            <div class="head-icon pull-left" @click="exit"><svg-icon iconClass = "exit" className = "exit" /></div>
        </div>
    </div>
</template>
<script>
import { computed } from '@vue/composition-api'
export default {
    name:'layoutHeader',
    setup(props,{root}){
        console.log(root)
        const username = computed(()=> root.$store.state.app.username)
        const navMenuState = ()=>{
            root.$store.commit('app/SET_COLLAPSE')
            // root.$store.dispatch('setMenuStatus')
        }
        const exit = ()=>{
            root.$store.dispatch('app/exit').then(()=>{
                root.$router.push({
                    name:'login'
                })
        })
        } 
        return{
            navMenuState,username,exit
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap{
    height:75px;
    line-height:75px;
    position: fixed;
    top:0;
    right:0;
    background-color:#fff;
    @include webkit(box-shadow,0 3px  16px 0 rgba(0,0,0,.1))
}
.open{
    #header-wrap{
        left:$navMenu;
    }
}
.close{
    #header-wrap{
        left:$navMenuL;
    }
}
.head-icon{
    padding:0 32px;
    svg{
        margin-bottom:-8px;
        font-size:25px;
        cursor: pointer;
    }
}
.user-info{
    height:100%;
    padding:0 32px;
    border-right:1px solid #ededed;
    + .header-icon{
        padding:0 28px;
    }
}
</style>