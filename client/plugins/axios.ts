import { Context } from "@nuxt/types";

export default function({ $axios, error }: Context) {
  $axios.onError(exception => {
    console.log("axios error handler called");
    let response = exception.response;
    error({
      message: response?.data.message || "server error",
      statusCode: response?.status,
    });
    return Promise.resolve(false);
  });
}
