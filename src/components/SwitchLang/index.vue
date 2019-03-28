<template>
    <el-dropdown class="international" trigger="click" @command="handleLanguage">
        <div>
            <svg-icon class-name="international-icon" icon-class="language" />
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="language==='zh'" command="zh">中文</el-dropdown-item>
            <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
export default {
    name:'SwitchLang',
    computed: {
        language() {
            return this.$store.state.language
        }
    },
    methods: {
        handleLanguage(lang){
            this.$i18n.locale = lang
            this.$store.dispatch('setLanguage', lang)
            this.$message({
                message: 'Switch Language Success',
                type: 'success'
            })
        }
    }
}
</script>