import path from "path";
interface ConfigType {
  serverPort: number;
  viewDir: string;
  staticDir: string;
  cache: boolean | string;
}
let config: ConfigType = {
  serverPort: 8082,
  viewDir: path.join(__dirname, "..", "views"),
  staticDir: path.join(__dirname, "..", "assets"),
  cache: false,
};
if (process.env.NODE_ENV === "development") {
  const devConfig = {
    cache: false,
  };
  config = { ...config, ...devConfig };
}
if (process.env.NODE_ENV === "production") {
  const prodConfig = {
    cache: "memory",
  };
  config = { ...config, ...prodConfig };
}
export default config;
