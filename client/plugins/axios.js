export default function ({ $axios }) {
  $axios.onError(error => {
    throw error;
  });
}
