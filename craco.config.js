const path = require("path")
const cracoLess = require("craco-less");
const addPath = dir => path.join(__dirname,dir);
const htmlWebpackPlugin=require('html-webpack-plugin');

module.exports = {
  webpack:{
    alias:{
      "@": addPath("src")
    },
    configure: (webpackConfig, {env, paths}) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        path: path.resolve(__dirname, 'public/editorList'),
        filename: "editorList.js",
        library: {
          name: 'EditorList',
          type: 'var'
        }
      }
      return webpackConfig;
    },
    plugins: {
      add: [
        new htmlWebpackPlugin({
          template: 'public/index.html',
        })
      ]
    }
  },
  plugins:[
    {
      plugin: cracoLess,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1890ff' },
            javascriptEnabled: true,
              //配置全局less 变量，不需要在使用的地方导入了
              globalVars: {
                hack: `true; @import '~@/assets/style/variable.less';`
            }
          },
        },
      },
    },
  ],
}
