<template>
    <div class="hamburger-wrapper" @click="toogleClick">
        <svg-icon icon-class="menuunfold" :class="['hamburger',{'is-active':isActive}]"/>
    </div>
</template>
<script>
export default {
    name:'Hamburger',
    props:{
        isActive:{
           type: Boolean,
           default: false
        },
        toogleClick:{
           type: Function,
           default: null
        } 
    },
    created(){
    }
}
</script>
<style lang="scss" scoped>
    .hamburger-wrapper{
        padding:0 15px;
        .hamburger {
            display: inline-block;
            vertical-align: middle;
            width: 20px;
            height: 20px;
            transition: .5s;
        }
        .hamburger.is-active {
            transform: rotate(180deg);
        }
    }
</style>