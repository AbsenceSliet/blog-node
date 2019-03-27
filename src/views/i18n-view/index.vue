<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <svg-icon icon-class="international" />
                <span style="margin-left:10px;">{{ $t('i18nView.title') }}</span>
            </div>
            <div>
                <el-radio-group v-model="lang" size="small">
                    <el-radio label="zh" border>简体中文</el-radio>
                    <el-radio label="en" border>English</el-radio>
                </el-radio-group>
                <el-tag style="margin-top:15px;display:block;" type="info">{{ $t('i18nView.note') }}</el-tag>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    name: "I18n",
    computed:{
        lang: {
            get(){
                return this.$store.state.language
            },
            set(lang){
                console.log(this.$i18n.locale,lang)
                //  this.$i18n.locale = lang
                //  this.$store.dispatch('setLanguage', lang)
            }
        }
    }
}
</script>
<style scoped>
.box-card {
  width: 600px;
  max-width: 100%;
  margin: 20px auto;
  margin-top: 50px;
}
</style>