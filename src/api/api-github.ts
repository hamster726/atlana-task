import axios, {AxiosInstance} from "axios";

const access_token : string = ""; // write your access token

const auth_string : string = access_token ? `token ${access_token}` : '';

const githubAPI: AxiosInstance = axios.create({
  baseURL: "https://api.github.com/",
  timeout: 1000,
  headers: {
    accept: "application/vnd.github.v3+json",
    Authorization: auth_string,
  },
});

const getUsers = async (value: string) => {
  return await githubAPI.get("search/users", { params: { q: value } });
};

const getUserDetails = async (userLogin: string) => {
  return await githubAPI.get(`users/${userLogin}`);
};

const getUserRepos = async (userLogin: string) => {
  return await githubAPI.get(`users/${userLogin}/repos`);
};

const getUserRepo = async (userLogin: string, val: string) => {
  return await githubAPI.get(`/search/repositories`, {
    params: { q: `${val}+user:${userLogin}` },
    paramsSerializer: function (params) {
      return `q=${params.q}`;
    },
  });
};

export { getUsers, getUserDetails, getUserRepos, getUserRepo };
