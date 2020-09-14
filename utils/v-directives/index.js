import Vue from 'vue';
import copy from './v-copy';
import avatar from "./v-avatar";
import href from "./v-href";
import lazyload from "./v-lazyload";
import scrollTop from "./v-scrollTop";

const directives = {
  copy,
  // avatar,
  // href,
  // lazyload,
  // scrollTop
};

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  },
};