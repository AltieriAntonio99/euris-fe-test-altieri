import axios from "axios";

const REACT_APP_API_URL = "http://us-central1-test-b7665.cloudfunctions.net";

const http = axios.create({
  baseURL: `${REACT_APP_API_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Pragma: "no-cache",
  },
  params: {},
});

http.interceptors.request.use(
  async (config) => {
    return Promise.resolve(config);
  },
  (error) => Promise.reject(error)
);

const onSuccess = function (response) {
  return response;
};

const onError = function (error) {
  return Promise.reject(error.response || error.message);
};

// API URL Parametrico
export const productAPI = {
  getAll: (idStore, page, pageSize) =>
    http.get(`stores/${idStore}/products?page=${page}&elements=${pageSize}`).then(onSuccess).catch(onError),
  get: (idStore, idProduct) =>
    http
      .get(`stores/${idStore}/products/${idProduct}`)
      .then(onSuccess)
      .catch(onError),
  getCategories: (idStore) =>
    http
      .get(`stores/${idStore}/stats/categories`)
      .then(onSuccess)
      .catch(onError),
  post: (idStore, o) =>
    http.post(`stores/${idStore}/products`, o).then(onSuccess).catch(onError),
  delete: (idStore, idProduct) =>
    http
      .delete(`stores/${idStore}/products/${idProduct}`)
      .then(onSuccess)
      .catch(onError),
};

export const storeAPI = {
  getAll: () => http.get(`stores`).then(onSuccess).catch(onError),
  get: (idStore) =>
    http.get(`stores/${idStore}`).then(onSuccess).catch(onError),
};
