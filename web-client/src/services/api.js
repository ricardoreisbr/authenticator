import axios from "axios";

const authorizationServerApi = axios.create({
  baseURL: "http://localhost:3001/",
});

const resourceServerApi = axios.create({
  baseURL: "http://localhost:3002/",
});

export { authorizationServerApi, resourceServerApi };
