
export default {
    props: {
        // 判定图片大小是否小于2MB
        fileSize:{
            type:Number,
            default:2
        },
        //v-model 匹配rules
        fileUrl:{
            type:String,
            required:false
        },
        maxWidthSize:{
            type:Number,
            default:300
        },
        maxHeightSize:{
            type:Number,
            default:300
        }
    },
    data(){
        return {
        };
    },
    methods: {
        _changeFile(file) {
            return new Promise(resolve=>{
                let _this = this;

                // 选择的文件对象(file里只包含图片的体积，不包含图片的尺寸)
                // let file = this.$input.files[0];
                console.log(file);

                // 选择的文件是图片
                if (file.type.indexOf('image') === 0) {
                // 压缩图片需要的一些元素和对象
                    let reader = new FileReader(),
                        //创建一个img对象
                        img = new Image();

                    reader.readAsDataURL(file);
                    // 文件base64化，以便获知图片原始尺寸
                    reader.onload = function (e) {
                        img.src = e.target.result;
                    };
                    let fileSize = file.size;
                    // base64地址图片加载完毕后执行
                    img.onload = function () {
                    // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
                        let canvas = document.createElement('canvas');
                        let context = canvas.getContext('2d');

                        // 图片原始尺寸
                        let originWidth = this.width;
                        let originHeight = this.height;

                        // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
                        let maxWidthSize = _this.maxWidthSize,
                            maxHeightSize = _this.maxHeightSize;
                        // 目标尺寸
                        let targetWidth = originWidth,
                            targetHeight = originHeight;
                        // 图片尺寸超过300x300或者大小大于300kb的限制
                        if ((originWidth > maxWidthSize || originHeight > maxHeightSize) && fileSize/1024 > _this.fileSize) {
                            if (originWidth / originHeight > maxWidthSize / maxHeightSize) {
                            // 更宽，按照宽度限定尺寸
                                targetWidth = maxWidthSize;
                                targetHeight = Math.round(maxWidthSize * (originHeight / originWidth));
                            } else {
                                targetHeight = maxHeightSize;
                                targetWidth = Math.round(maxHeightSize * (originWidth / originHeight));
                            }
                        }
                        // canvas对图片进行缩放
                        canvas.width = targetWidth;
                        canvas.height = targetHeight;


                        console.log(targetWidth,targetHeight);
                        // 清除画布
                        context.clearRect(0, 0, targetWidth, targetHeight);
                        // 在canvas绘制前填充白色背景
                        context.fillStyle = 'rgba(255, 255, 255, 0)';
                        context.fillRect(0, 0, canvas.width, canvas.height);
                        // 图片压缩
                        context.drawImage(img, 0, 0, targetWidth, targetHeight);
                        /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/


                        //压缩后的图片转base64 url
                        /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/png';
                     * qualityArgument表示导出的图片质量，只有导出为jpeg和webp格式的时候此参数才有效，默认值是0.92*/
                        // let newUrl = canvas.toDataURL('image/jpeg', 0.92); //base64 格式
                        let newUrl = canvas.toDataURL('image/png', 1); // 转换图片为dataURL
                        _this.$emit('update:fileUrl', newUrl);
                        resolve(_this._dataURLtoFile(newUrl,file.name));
                    // _this.img = newUrl;
                    // //也可以把压缩后的图片转blob格式用于上传
                    // canvas.toBlob((blob)=>{
                    //     // console.log(blob)

                    //     //把blob作为参数传给后端
                    // }, 'image/png', 1)
                    };
                } else {
                    alert('请上传图片格式');
                }
            });
        },
        // 把base64 转换成文件对象
        _dataURLtoFile(base64Str, fileName) {
            var arr = base64Str.split(','),
                mime = arr[0].match(/:(.*?);/)[1], //base64解析出来的图片类型
                bstr = atob(arr[1]), //对base64串进行操作，去掉url头，并转换为byte   atob为window内置方法
                len = bstr.length,
                ab = new ArrayBuffer(len), //将ASCII码小于0的转换为大于0
                u8arr = new Uint8Array(ab); //
            while (len--) {
                u8arr[len] = bstr.charCodeAt(len);
            }
            // 创建新的 File 对象实例[utf-8内容，文件名称或者路径，[可选参数，type：文件中的内容mime类型]]
            return new File([u8arr], fileName, {
                type: mime
            });
        },
        _uploadUrl() {
            let urlHost = process.env.API_HOST;
            return urlHost +
            'api/zhihuijingqu/application/upload-file?merchantId=' +
            sessionStorage._zhihuimerchantId +
            '&skinName=tesla';
        }
    },
    created(){
    }
};
