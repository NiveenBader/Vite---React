import axios from "axios";
import config from "../config.json";

axios.defaults.baseURL = config.apiUrl;

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default httpService;
