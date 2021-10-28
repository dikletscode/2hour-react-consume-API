import axios from "axios";

export const API = axios.create({
  baseURL: "http://18.139.50.74:8080/",
});

API.interceptors.response.use(
  (res) => {
    console.log(res.headers);
    return Promise.resolve(res);
  },
  (err) => {
    console.log(err, "Err");
    if (err.response && err.response!.status === 403) {
      localStorage.removeItem("credential");
      window.location.reload();
    } else {
      return Promise.reject(err);
    }
  }
);
