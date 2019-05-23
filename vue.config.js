const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}
console.log(resolve('src'), 'jjjj')
const BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:8088' : 'http://api.garener.com:8088/'

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
    chainWebpack: (config) => {
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()

        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
    },
    configureWebpack: config => {
        config.externals = {
            vue: "Vue",
        }
    },

    // configureWebpack: {
    //     resolve: {
    //         alias: {
    //             'src': '@',
    //             'src/assets': '@assets'
    //         }
    //     }
    // },
    devServer: {
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