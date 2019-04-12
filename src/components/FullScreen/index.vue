<template>
    <div>
        <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="fullScreen" />
    </div>
</template>
<script>
export default {
    name: 'FullScreen',
    data(){
        return {
            isFullscreen: false
        }
    },
    methods: {
        fullScreen(){            
            this.$fullscreen.toggle(this.$root.$el.querySelector('.app-wrapper'), {
                wrap: false,
                callback: this.fullscreenChange
            })
        },
        fullscreenChange (fullscreen) {
            this.isFullscreen = fullscreen
        }
    },
}
</script>