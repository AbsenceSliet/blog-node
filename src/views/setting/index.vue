<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="margin-left:10px;">{{ $t('setting.title') }}</span>
            </div>
            <el-form ref="form" label-position="center"   label-width="120px" size="mini">
                <el-form-item :label="$t('setting.name')">
                        <span>{{user_name}}</span>
                </el-form-item>
                <el-form-item :label="$t('setting.createTime')">
                        <span>{{user_c_time}}</span>
                </el-form-item>
                <el-form-item :label="$t('setting.permission')">
                        <span>{{userrole}}</span>
                </el-form-item>

                <el-form-item :label="$t('setting.avatar')">
                    <div class="avatar-uploader">
                        <div class="el-upload">
                            <img v-if="avatar" :src="avatar" class="avatar">
                            <input type="file" class="upload-input" @change="uploadimage" >
                        </div>
                    </div>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>
<style  lang="scss"  rel="stylesheet/scss">
    .box-card {
        width: 600px;
        max-width: 100%;
        margin: 20px auto;
        margin-top: 50px;
        .avatar-uploader{
            .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                .upload-input{
                    position:absolute;
                    width: 128px;
                    height: 128px;
                    opacity:0;
                    top:0;
                    left:0;
                    cursor: pointer;
                }
                .avatar-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: 128px;
                    height: 128px;
                    line-height: 128px;
                    text-align: center;
                }
                .avatar {
                    width: 128px;
                    height: 128px;
                    display: block;
                }
            }
            .el-upload:hover {
                border-color: #409EFF;
            }
        }
    }
</style>
<script>
import { mapGetters } from 'vuex'
import { TOKEN } from '@/constants/auth'
export default {
    name: 'Setting',
    data(){
        return {
            fetchheader:{
                 Authorization: `Bearer ${localStorage.getItem(TOKEN)}`
            }
        }
    },
    computed: {
        ...mapGetters([
            'avatar',
            'user_c_time',
            'status',
            'user_name'
        ]),
        userrole(){
            return this.status == 2 ? '超级管理员' : '普通管理员'
        }
    },
    methods:{
        uploadimage(e){
            let formData = new FormData();
            formData.append('file', e.target.files[0]);
            this.$store.dispatch('uploadAvatar',formData).then(res=>{
                if(res.data.code == 1){
                    this.$message({message:'上传图片成功！', type: 'success'});
                }else{
                    this.$message.error('上传图片失败！');
                }
            },err=>{
                this.$message.error('上传图片失败！',err.message);
            })
        }
    }
}
</script>