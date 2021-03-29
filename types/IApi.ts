import { IData } from "./IData";
export interface IApi {
  getData(): Promise<IData>;
}
