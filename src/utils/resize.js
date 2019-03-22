import store from "../store"
const WIDTH = 992 
const { body } = document
export default{
    watch :{
        $route(route) {
            if(this.device == 'mobile' && this.sidebar.opened) {
                store.dispatch('closeSideBar', { withoutAnimation: false })
            }
        }
    },
    beforeMount() {
        window.addEventListener('resize', this.resizeHandler)
    },
    mounted() {
        const isMobile = this.isMobile()
        if (isMobile) {
            store.dispatch('toggleDevice', 'mobile')
            store.dispatch('closeSideBar', { withoutAnimation: true })
        }
    },
    methods:{
        resizeHandler() {
            console.log(12312)
            if (!document.hidden) {
                const isMobile = this.isMobile()
                store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')

                if (isMobile) {
                    store.dispatch('closeSideBar', { withoutAnimation: true })
                }
            }
        },
        isMobile() {
            const rect = body.getBoundingClientRect()
            return rect.width - 1 < WIDTH
        },
    }
}