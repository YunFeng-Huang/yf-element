import pagination from './src/index.vue';

/* istanbul ignore next */
pagination.install = function(Vue) {
    Vue.component(pagination.name, pagination);
};

export default pagination;
