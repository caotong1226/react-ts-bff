import Koa from "koa";
import errorHandler from "./middlewares/ErrorHandler";
import { createContainer, Lifetime } from "awilix";
import { scopePerRequest, loadControllers } from "awilix-koa";
import render from "koa-swig";
import co from "co";
import serve from "koa-static";
import { historyApiFallback } from "koa2-connect-history-api-fallback";
import config from "./config";
import { join } from "path";
import log4js from "log4js";
const app = new Koa();

log4js.configure({
  appenders: {
    globalError: {
      type: "file",
      filename: "./logs/error.log",
    },
  },
  // 只有错误是error级别才会写入文件
  categories: {
    default: {
      appenders: ["globalError"],
      level: "error",
    },
  },
});
const logger = log4js.getLogger("globalError");

app.context.render = co.wrap(
  render({
    root: config.viewDir,
    autoescape: true,
    cache: config.cache,
    ext: "html",
    writeBody: false,
  })
);

const container = createContainer();
container.loadModules([__dirname + "/services/*.ts"], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});
app.context.render = co.wrap(
  render({
    writeBody: false,
  })
);

app.use(serve(config.staticDir));

app.use(historyApiFallback({ index: "/", whiteList: ["/api"] }));

errorHandler.error(app, logger);

app.use(scopePerRequest(container));
app.use(loadControllers(__dirname + "/controllers/*.ts"));

app.listen(config.serverPort, function () {
  console.log("Server is running on port " + config.serverPort);
});
