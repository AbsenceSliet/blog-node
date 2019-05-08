<template>
    <div class="login_view fillpage">
        <transition name= "login-fade" mode="in-out" >
            <section class="form_container" v-show= "showLogin">
                <el-form :model="loginForm" ref="loginForm">
                    <el-form-item prop="username">
                        <el-input v-model ="loginForm.username" :placeholder="$t('login.username')"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model ="loginForm.passward" :placeholder="$t('login.password')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login('loginForm')" class="login_btn">{{$t('login.login')}}</el-button>
                    </el-form-item>
                </el-form>
            </section>
        </transition>
    </div>
</template>
<script>
import { Base64 } from 'js-base64';
export default {
    data(){
        return{
            showLogin: false,
            redirect:undefined,
            loginForm:{
                username: '',
                passward: '',
            },
            rules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                passward:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min:6, max: 9, message:'密码长度在6-9个字符', trigger: 'blur' }
                ]
            }
        }
    },
    mounted(){
        this.showLogin = true
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods:{
        async login(formName){
            this.$refs[formName].validate(async (valid) =>{
                if(valid){
                    let userinfo = {username : this.loginForm.username, password: Base64.encode(this.loginForm.passward)}
                    this.$store.dispatch('Login',userinfo).then(res => {
                        console.log(this.redirect,'redirect')
                        if(res.data.code == 1) {
                            this.$message({message:`${res.data.message}`, type: 'success'});
                            this.$router.push({ path: this.redirect || '/' })
                        }else{
                            this.$message({message:`${res.data.message}`, type: 'error'});
                        }
                    }).catch(error => {
                        this.$message({message:`${error.message}`, type: 'error'});
                    })
                }
            })  
        }
    }
}
</script>
<style lang="scss">
 @import '~@/style/mixin';
    .login_view{
        background-color: $main_color;
        color:$font_color;
    }
    .form_container{
        @include wh(320px, 210px);
        @include ctp(210px, 210px);
        padding: 25px;
        border-radius: 5px;
        text-align: center;
        background-color: #fff;
        .login_btn{
            width: 100%;
			font-size: 16px;
        }
    }
    .login-fade-enter-active, .login-fade-leabe-active{
        transition: all 1s;
    }
    .login-fade-enter, .login-fade-leave{
        transform: translate3d(0, -50px, 0);
        opacity: 0;
    }
</style>