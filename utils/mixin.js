
export default {
    data(){
        return {
        };
    },
    methods: {
        getRowClass({ rowIndex }) {
            if (rowIndex === 0) {
                return {
                    'background': '#F6F8FC',
                    'font-size': '1rem',
                    'font-family': 'MicrosoftYaHei',
                    'font-weight': '400',
                    'color': 'rgba(102,102,102,1)',
                    'padding': '0.58rem 0'
                };
            }
            return '';
        },
        uploadUrl() {
            let urlHost = process.env.API_HOST;
            return urlHost +
            'api/zhihuijingqu/application/upload-file?merchantId=' +
            sessionStorage._zhihuimerchantId +
            '&skinName=tesla'
        },
    },
    created(){
    }
};
