import upload from './src/index.vue';

/* istanbul ignore next */
upload.install = function(Vue) {
    Vue.component(upload.name, search);
};

export default upload;
