<template>
    <div class="app-wrapper" :class="sidebarClass">
        <sidebar class="sidebar-container" />
        <div class="main-container">
            <navbar  />
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Sidebar from  './sidebar';
import Navbar from  './navbar';
import { mapGetters } from 'vuex'
export default {
    name:'Layout',
    data(){
        return{}
    },
    components:{
        Sidebar,
        Navbar
    },
    computed: {
        ...mapGetters([
            'sidebar'
        ]),
        sidebarClass(){
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened
            }
        }
    },
}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
@import "@/style/mixin.scss";
.app-wrapper{
    @include clearfix;
    position:relative;
    width:100%;
    height:100%;
    &.openSidebar{
      position: fixed;
      top: 0;
    }
}  
</style>