import * as all from "./index";
import { MessageBox } from 'element-ui';
export const throttle = (wait=1000, options = {})=> {
    return (target, name, descriptor)=> {
        descriptor.value = all.throttle(descriptor.value, wait, options);
    };
};
export const debounce = (wait=1000, options = {})=> {
    return (target, name, descriptor)=> {
        descriptor.value = all.debounce(descriptor.value, wait, options);
    };
};
export const confirm = (
    message = "此操作将永久删除该文件, 是否继续?",
    title = "提示",
    cancelFn = function(error) {
        console.log(error)
    }
) =>{
    return (target, name, descriptor)=> {
        const originFn = descriptor.value;
        descriptor.value = function(...args) {
            MessageBox.confirm(message, title, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                originFn.apply(this, args);
            }).catch((error) => {
                cancelFn && cancelFn(error);       
            });
        };
    };
}
