import { route, GET } from "awilix-koa";
import { Context } from "koa";
@route("/api")
class ApiController {
  private indexService;
  constructor({ indexService }) {
    this.indexService = indexService;
  }
  @route("/data")
  @GET()
  async actionData(ctx: Context, next: Promise<any>) {
    const result = await this.indexService.getData();
    ctx.body = { result };
  }
}
export default ApiController;
