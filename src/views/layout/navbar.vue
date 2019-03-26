<template>
    <div class="navbar">
        <hamburger class="hamburger-container" :toogle-click="toogleSidebar" :is-active="sidebar.opened"/> 
         <breadcurmb class="breadcrumb-container"/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcurmb from '@/components/Breadcurmb'
export default {
    props:{

    },
    computed:{
        ...mapGetters([
            'sidebar'
        ])
    },
    components:{
        Hamburger,
        Breadcurmb
    },
    methods: {
        toogleSidebar(){
            console.log(this.$route);
            
            this.$store.dispatch('toggleSideBar')
        }
    },
}
</script>
<style lang="scss" scoped>
    .navbar{
        height:50px;
        overflow: hidden;
    }
    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background .3s;

        &:hover {
            background: rgba(0, 0, 0, .025)
        }
    }
    .breadcrumb-container {
        float: left;
    }
</style>