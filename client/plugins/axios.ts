import { Context } from "@nuxt/types";

export default function({ $axios, error, $ErrorToast }: Context) {
  $axios.onError(exception => {
    let response = exception.response;
    let message = "server error";
    if (!response) {
      message = `server is not running at ${exception.config.baseURL}${exception.config.url} (method: ${exception.config.method})`;
    }
    if (response?.status === 400) {
      $ErrorToast(response?.data.message || message);
    } else {
      error({
        message: response?.data.message || message,
        statusCode: response?.status,
      });
    }
    return Promise.resolve(false);
  });
}
