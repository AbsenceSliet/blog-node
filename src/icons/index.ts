import Vue from 'vue';
import SvgIcon from '@/components/svgIcon.vue';
Vue.component('svg-icon', SvgIcon);
const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext: any) => requireContext.keys().map(requireContext);
console.log(requireAll(req));
requireAll(req);
