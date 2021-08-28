/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require("path")

const extraNodeModules = {
  pages: path.resolve(__dirname + "/pages"),
  features: path.resolve(__dirname + "/features"),
  shared: path.resolve(__dirname + "/shared")
}

const watchFolders = Object.values(extraNodeModules)
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  },

  projectRoot: path.resolve(__dirname),
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        //redirects dependencies referenced from common/ to local node_modules
        name in target
          ? target[name]
          : path.join(process.cwd(), `node_modules/${name}`)
    })
  },

  watchFolders
}
