const path = require('path');
module.exports = {
    productionSourceMap: false,
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        // 允许绑定本地域名
        allowedHosts: ['cjpp.fun'],
        open: true,
        overlay: {
            warnings: false,
            errors: true,
        },
        // port: 443,
        // https: {
        //     key: fs.readFileSync("E:/https/private.key"),
        //     cert: fs.readFileSync("E:/https/full_chain.pem"),

        // },
        // https: false,
        proxy: {
            '/mlp-api': {
                // target: 'https://service-foi3os32-1253410361.ap-guangzhou.apigateway.myqcloud.com/release/xinghuo-code/mlp/ebus/mlp',
                // target: 'http://119.23.41.52:9040',
                // target: 'http://192.168.0.53:8097/mlp',
                target: 'http://119.23.41.52:8097/mlp',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/mlp-api': '/'
                        //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx   
                        //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
                }
            },
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                // 别名
                // vue$: "vue/dist/vue.runtime.min.js", //加上这一句
                '@': path.resolve('src'),
                '@com': path.resolve('src/components'),
            },
        },

    },
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, {
                limit: 15000
            }))
    },
    css: {
        loaderOptions: {
            // 给 less-loader 传递 Less.js 相关选项
            less: {
                // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
                // `primary` is global variables fields name
                globalVars: {
                    primary: '#2c70f1',
                    backfont: '#fff',
                    'padding-top': '5px',
                    'border-color': '#ebedf0',
                    'max-width': '768px',
                    'bar-height': '7vh',
                    'bar-min-height': '44px',
                    'remind-line-height': '30px',
                },
            },
        },
    },
};