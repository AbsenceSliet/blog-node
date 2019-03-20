<template>
    <div class="app-wrapper">
        <sidebar class="sidebar-container" />
        <div class="main-container">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Sidebar from  './sidebar';
export default {
    name:'Layout',
    data(){
        return{}
    },
    components:{
        Sidebar
    }
}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
@import "@/style/mixin.scss";
.app-wrapper{
    @include clearfix;
    position:relative;
    width:100%;
    height:100%;
}
    
</style>