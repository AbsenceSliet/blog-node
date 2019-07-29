const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');  //webpack打包工具 需要安装 npm install uglifyjs-webpack-plugin
function resolve(dir) {
    return path.join(__dirname, dir)
}
const BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:8088' : 'http://api.garener.com:8088/'
//生产环境
const isProduction = process.env.NODE_ENV === 'production';
console.log(process.env.NODE_ENV, 'kkkkk');
// 是否使用gzip
const productionGzip = true
    // 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']


const cdn = {
    build: {
        css: [
            'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
        ],
        js: [
            'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
            'https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js',
            'https://cdn.bootcss.com/vue-router/3.0.6/vue-router.min.js',
            'https://cdn.bootcss.com/vue-i18n/8.11.2/vue-i18n.min.js',
            'https://cdn.bootcss.com/element-ui/2.8.2/index.js',
            'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
            'https://cdn.bootcss.com/js-cookie/2.2.0/js.cookie.min.js'
        ]
    }
}

// cdn预加载使用
const externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios',
    'element-ui': 'ELEMENT',
    'js-cookie': 'Cookies'
}

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    indexPath: 'index.html',
    runtimeCompiler: false,
    // lintOnSave: process.env.NODE_ENV !== 'production',
    lintOnSave: false,
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // 开启 CSS source maps?
    css: {
        //如果你想去掉文件名中的 .module，可以设置 vue.config.js 中的 css.modules 为 true
        modules: false,
        //如果你希望自定义生成的 CSS Modules 模块的类名
        loaderOptions: {
            css: {
                localIdentName: '[name]-[hash]',
                camelCase: 'only'
            },
            //比如你可以这样向所有 Sass 样式传入共享的全局变量：
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                // data: `@import "@/variables.scss";`
            }
        },
        //生产环境下是 true，开发环境下是 false
        //是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
        //提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。
        //然而，你仍然可以将这个值显性地设置为 true 在所有情况下都强制提取
        extract: process.env.NODE_ENV === 'production' ? true : false,
        sourceMap: false
    },
    chainWebpack: config => {
        /**
         * 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
         */
        config.plugin('html')
            .tap(args => {
                if (process.env.NODE_ENV === 'production') {
                    args[0].cdn = cdn.build
                }
                if (process.env.NODE_ENV === 'development') {
                    // args[0].cdn = cdn.dev
                }
                return args;
            })
        const svgRule = config.module.rule('svg') // 找到svg-loader
        svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
        svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
        config.module
            .rule('svg')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
        const imagesRule = config.module.rule('images')
        imagesRule.exclude.add(resolve('src/icons'))
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
        if (isProduction) {
            // 删除预加载
            config.plugins.delete('preload');
            config.plugins.delete('prefetch');
            // 压缩代码
            config.optimization.minimize(true);
            // 分割代码
            config.optimization.splitChunks({
                chunks: 'all'
            })
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            //生产环境修改配置
            //1.生产环境npm包转CDN
            config.externals = externals

            // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
            productionGzip && config.plugins.push(
                new CompressionWebpackPlugin({
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 8192,
                    minRatio: 0.8
                })
            )
            config.plugins.push(
                //生产环境自动删除console
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                          // warnings: false,
                          drop_debugger: true,
                          drop_console: true,
                        },
                    },
                    //是否生成sourceMap
                    sourceMap: false,
                    //使用多进程并行运行来提高构建速度
                    parallel: true,
                })
            );
        } else {
            //开发环境修改配置
        }
    },
    devServer: {
        compress: false, // 开启压缩
        port: 8089,
        proxy: {
            '/': {
                target: BASE_URL, //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/': ''
                }
            }
        }
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // 启用并行化。默认并发运行数：os.cpus().length - 1。并行化可以显著加速构建
    parallel: require('os').cpus().length > 1,
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: false
        }
    },
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    }
}