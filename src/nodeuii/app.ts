import Koa from "koa";
import { createContainer, Lifetime } from "awilix";
import { scopePerRequest, loadControllers } from "awilix-koa";
import render from "koa-swig";
import co from "co";
import serve from "koa-static";
import { historyApiFallback } from "koa2-connect-history-api-fallback";
import config from "./config";
import { join } from "path";
const app = new Koa();
app.context.render = co.wrap(
  render({
    root: join(__dirname, "views"),
    autoescape: true,
    cache: "memory",
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
    // ...your setting
    writeBody: false,
  })
);
app.use(serve(__dirname + "/assets"));
app.use(historyApiFallback({ index: "/", whiteList: ["/api"] }));
app.use(scopePerRequest(container));
app.use(loadControllers(__dirname + "/controllers/*.ts"));
app.listen(config.serverPort, function () {
  console.log("Server is running on port " + config.serverPort);
});
