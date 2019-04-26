<template>
    <div class="article-wrapper">
        <header class="create-title">文章内容</header>
        <el-form label-position="top"  :model="articleContent" size="small">
            <el-row :gutter="50" :class="device == 'mobile'? 'content-row':''">
                <el-col  :md="16">
                    <el-form-item label="文章标题">
                        <el-input v-model="articleContent.title"></el-input>
                    </el-form-item>
                </el-col>
                <el-col  :md="8">
                    <el-form-item label="文章标题">
                        <el-select v-model="category_value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="文章摘要">
                <el-input v-model="articleContent.abstract"></el-input>
            </el-form-item>
            <el-form-item label="文章标签">
                <div class="tags-warpper">
                    <el-tag class="tag" size="small" v-for="(tag,index) in tags" :disable-transitions="false" :key="index" @close="closeTag(tag)" closable>{{tag}}</el-tag>
                </div>
                <el-input v-model="articleContent.tag"  @keyup.enter.native="inputTag"
                @blur="inputTag"></el-input>
            </el-form-item>
            <el-form-item label="正文">
                <mavon-editor v-model="mavon"/>
            </el-form-item>
        </el-form>
        <div class="articleSave">
            <el-button type="primary" ><svg-icon icon-class= "send"/> 发布</el-button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            articleContent: {
                title:'',
                abstract:'',
                tag:''
            },
            tags:[],
            category_value:'',
            options: [{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
            }, {
            value: '选项3',
            label: '蚵仔煎'
            }, {
            value: '选项4',
            label: '龙须面'
            }, {
            value: '选项5',
            label: '北京烤鸭'
            }],
            mavon:''
        }
    },
    computed:{
        ...mapGetters([
            'device'
        ])
    },
    methods: {
        inputTag(){
            let inputVal = this.articleContent.tag
            if(inputVal && !this.tags.includes(inputVal)){
                this.tags.push(inputVal)
            }
            this.articleContent.tag = ''
        },
        closeTag(tag){
            this.tags.length > 0 ? this.tags.splice(this.tags.indexOf(tag), 1) :''
        }
    },
}
</script>
<style lang="sass" scoped>
    .article-wrapper
        margin:40px 20px 0px
        padding:20px 15px
        background-color:#fff
        box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04)
        header
            text-align: center
        .content-row
            flex-direction: column
            display: flex
        .tags-warpper
            .tag
                margin: 0 10px 10px
        
</style>