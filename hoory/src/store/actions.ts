import { Dispatch } from "redux";
import Axios from "axios";
import ApiRoutes from "../api/routes";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import ActionTypes from "./types";

const api_endpoint = process.env.REACT_APP_ENDPOINT

interface IUserData {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
}

export function loginUser(userEmail: string, userPassword: string) {
  return (dispatch: Dispatch<any>) => {
    return Axios.post<IUserData>(api_endpoint + ApiRoutes.AUTHENTICATE_USER, {
      email: userEmail,
      password: userPassword,
    })
      .then((response: any) => {
        const { token, ...userData } = response.data;
        setAuthorizationToken(token);
        dispatch({
          type: ActionTypes.SET_USER,
          payload: userData,
        });
        dispatch({ type: ActionTypes.SET_AUTHENTICATION, payload: true });
      })
      .catch((error: any) => {
        dispatch({ type: ActionTypes.SET_AUTHENTICATION, payload: false });
      });
  };
}

export function getUserWorkspaces() {
  return (dispatch: Dispatch<any>) => {
    return Axios.get(api_endpoint + ApiRoutes.GET_WORKSPACE)
      .then(({ data }) => {
        dispatch({ type: ActionTypes.SET_WORKSPACES, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.SET_WORKSPACES, payload: [] });
      });
  };
}

export interface ICreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function createUserAccount(userData: ICreateUserData) {
  return (dispatch: Dispatch<any>) => {
    return Axios.post(api_endpoint + ApiRoutes.CREATE_USER, userData).catch(
      () => {
        dispatch({ type: ActionTypes.SET_AUTHENTICATION, payload: false });
      }
    );
  };
}

type Gender = "male" | "female";
export interface IWorkspaceData {
  assistantName: string;
  gender: Gender;
  colorScheme: number;
}

export function createUserWorkspace(workspaceData: IWorkspaceData) {
  return (dispatch: Dispatch<any>) => {
    return Axios.post(api_endpoint + ApiRoutes.CREATE_WORKSPACE, workspaceData)
      .then(({ data }) => {
        dispatch({ type: ActionTypes.SET_WORKSPACES, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.SET_WORKSPACES, payload: [] });
      });
  };
}

export function logoutUser() {
  return (dispatch: Dispatch<any>) => {
    setAuthorizationToken(null);
    dispatch({ type: ActionTypes.SET_AUTHENTICATION, payload: false });
  };
}

export function removeWorkspace(workspaceId: string) {
  return (dispatch: Dispatch<any>) => {
    return Axios.delete(api_endpoint + ApiRoutes.DELETE_WORKSPACE, {
      data: { workspaceId },
    })
      .then(({ data }) => {
        dispatch({ type: ActionTypes.SET_WORKSPACES, payload: data });
      })
      .catch((error) => {
        console.log("error", error);
        dispatch({ type: ActionTypes.SET_WORKSPACES, payload: [] });
      });
  };
}

export function updateWorkspace(workspaceId: string) {
  return (dispatch: Dispatch<any>) => {
    return Axios.post(api_endpoint + ApiRoutes.UPDATE_WORKSPACE, workspaceId)
      .then(({ data }) => {
        dispatch({ type: ActionTypes.SET_WORKSPACES, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.SET_WORKSPACES, payload: [] });
      });
  };
}
