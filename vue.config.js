module.exports = {
    devServer: {
        proxy: {
              '/ajax':{
                target:'https://m.maizuo.com',
                changeOrigin:true
            }
        }
    }
}