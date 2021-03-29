import { route, GET } from "awilix-koa";
import { Context } from "koa";
import { IApi } from "../../../types/IApi";
@route("/api")
class ApiController {
  private indexService: IApi;
  constructor({ indexService }) {
    this.indexService = indexService;
  }
  @route("/data")
  @GET()
  async actionData(ctx: Context, next: () => Promise<unknown>): Promise<any> {
    const result = await this.indexService.getData();
    ctx.body = { result };
  }
}
export default ApiController;
