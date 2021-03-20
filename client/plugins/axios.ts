import { Context } from "@nuxt/types";

export default function({ $axios, error }: Context) {
  $axios.onError(exception => {
    let response = exception.response;
    let message = "server error";
    console.log({ ...exception });
    if (!response) {
      message = `server is not running at ${exception.config.baseURL}${exception.config.url} (method: ${exception.config.method})`;
    }
    error({
      message: response?.data.message || message,
      statusCode: response?.status,
    });
    return Promise.resolve(false);
  });
}
