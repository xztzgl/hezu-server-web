const { injectBabelPlugin } = require("react-app-rewired");
// const ProvidePlugin = require("webpack/lib/ProvidePlugin");
const rewireLess = require("react-app-rewire-less");
const rewireCssModules = require("react-app-rewire-css-modules");
const rewireEslint = require("react-app-rewire-eslint");
const path = require("path");
const configJOSN = require("./config.json");
// new ProvidePlugin({ $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' }),

module.exports = function override (config, env) {
  config = injectBabelPlugin(["import", { libraryName: "antd", libraryDirectory: "es", style: true }], config);
  config = injectBabelPlugin("babel-plugin-transform-decorators-legacy", config);
  // remove console.log
  if (env === "production") {
    console.log("⚡ Console.log removed on Production");
    config = injectBabelPlugin("babel-plugin-transform-remove-console", config);
  }

  config = rewireCssModules(config, env);
  delete configJOSN.host;
  delete configJOSN.logo;

  config = rewireLess.withLoaderOptions({
    modifyVars: configJOSN
  })(config, env);
  config = rewireEslint(config, env);

  const loaderList = config.module.rules[1].oneOf;
  loaderList.splice(loaderList.length - 1, 0, {
    test: /\.scss$/,
    use: ["style-loader", "css-loader", "sass-loader"]
  });

  config.resolve = {
    alias: {
      srcDir: path.resolve(__dirname, "./src"),
      projectRoot: path.resolve(__dirname, "./"),
      pages: path.resolve(__dirname, "./src/pages"),
    }
  };
  return config;
};
