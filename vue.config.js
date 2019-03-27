const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production',

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
                target: 'http://localhost:8088', //对应自己的接口
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
