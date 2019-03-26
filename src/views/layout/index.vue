<template>
    <div class="app-wrapper" :class="sidebarClass">
        <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
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
import resizeMixin from '@/utils/resize' 
export default {
    name:'Layout',
    data(){
        return{}
    },
    mixins: [resizeMixin],
    components:{
        Sidebar,
        Navbar,
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'device'
        ]),
        sidebarClass(){
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                mobile: this.device === 'mobile',
                withoutAnimation: this.sidebar.withoutAnimation,
            }
        }
    },
    methods:{
        handleClickOutside(){
            this.$store.dispatch('closeSideBar', { withoutAnimation: false })
        }
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
    &.openSidebar{
      position: fixed;
      top: 0;
    }
    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }
}  
</style>