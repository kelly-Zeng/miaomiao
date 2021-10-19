module.exports = {
    devServer: {
        proxy: {
            '/ajax':{
                target:'http://localhost:3000',
                changeOrigin:true
            },
              '/ajax':{
                target:'https://m.maizuo.com',
                changeOrigin:true
            }
        }
    }
}