import elTreeTransfer from './src/index.vue';

/* istanbul ignore next */
elTreeTransfer.install = function(Vue) {
    Vue.component(elTreeTransfer.name, elTreeTransfer);
};

export default elTreeTransfer;
