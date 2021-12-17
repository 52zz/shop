// vue-cli的配置文件
module.exports = {
    devServer: {
        proxy: {
            "/commercial_api": {
                target: "https://www.zhihu.com"
            },
        }
    }
}