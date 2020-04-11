import VElTable from './src/index.vue';

/* istanbul ignore next */
VElTable.install = function(Vue) {
    Vue.component(VElTable.name, VElTable);
};

export default VElTable;
