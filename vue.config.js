const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:8088' : 'http://47.102.154.71:8088'

module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production',
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // 开启 CSS source maps?
    css: {
        sourceMap: false,
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

    devServer: {
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
    }
}