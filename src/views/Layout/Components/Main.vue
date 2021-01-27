<template>
    <div id="main-wrap">
        <div class="main-content">
            <div class="content">
                <router-view />
            </div>
        </div>
        
    </div>
</template>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap{
    height: 100vh;
}
.main-content{
    width:100%;
    height:100%;
    padding-top: $layoutHeader + 30;
    padding-right:30px;
    @include webkit(box-sizing,border-box);
}
.open{
    .main-content{
        padding-left:$navMenu + 30;
    }
}
.close{
    .main-content{
        padding-left:$navMenuL + 30;
    }
}
.content{
    width:100%;
    height:100%;
    padding:30px 30px 0 ;
    background-color:#fff;
    @include webkit(box-sizing,border-box);
}
</style>