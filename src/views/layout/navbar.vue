<template>
    <div class="navbar">
        <hamburger class="hamburger-container" :toogle-click="toogleSidebar" :is-active="sidebar.opened"/> 
         <breadcurmb class="breadcrumb-container"/>
        <div class="right-menu">
            <div v-if = "device !== 'mobile'" style="display:inline-block">
                <full-screen class="right-menu-item hover-effect" />
                <switch-lang class="right-menu-item hover-effect" />
            </div>
            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                <div class="avatar-wrapper">
                    <img :src="avatar" class="user-avatar">
                    <i class="el-icon-caret-bottom"/>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/">
                        <el-dropdown-item>
                        {{$t('navbar.dashboard')}}
                        </el-dropdown-item>
                    </router-link>
                    <a target="_blank" href="https://github.com/AbsenceSliet/blog-node">
                        <el-dropdown-item>
                        {{$t('navbar.github')}}
                        </el-dropdown-item>
                    </a>
                    <el-dropdown-item divided>
                        <span style="display:block;" @click="logout">{{$t('navbar.logOut')}}</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcurmb from '@/components/Breadcurmb'
import SwitchLang from '@/components/SwitchLang'
import FullScreen from '@/components/FullScreen'
export default {
    props:{

    },
    computed:{
        ...mapGetters([
            'sidebar',
            'device',
            'avatar'
        ])
    },
    components:{
        Hamburger,
        Breadcurmb,
        SwitchLang,
        FullScreen
    },
    methods: {
        toogleSidebar(){
            this.$store.dispatch('toggleSideBar')
        },
        logout(){
            this.$store.dispatch('LogOut').then(() => {
                location.reload()
            })
        }
    },
}
</script>
<style lang="scss" scoped>
    .navbar{
        height:50px;
        overflow: hidden;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
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
    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }
        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background .3s;

                &:hover {
                    background: rgba(0, 0, 0, .025)
                }
            }
        }
        .avatar-container {
            margin-right: 30px;
            .avatar-wrapper {
                margin-top: 5px;
                position: relative;
                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }
                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
</style>