import Axios from "axios";

async function setAuthorizationToken(token: string | null) {
  if (token) {
    Axios.defaults.headers.common["x-auth-token"] = `${token}`;
  } else {
    delete Axios.defaults.headers.common["x-auth-token"];
  }
}

export default setAuthorizationToken;
