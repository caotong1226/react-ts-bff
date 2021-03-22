import { route, GET } from "awilix-koa";
import { Context } from "koa";
@route("/")
class IndexController {
  @GET()
  async actionData(ctx: Context, next: Promise<any>) {
    ctx.body = await ctx.render("index");
  }
}
export default IndexController;
