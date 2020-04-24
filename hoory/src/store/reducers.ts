import { combineReducers } from "redux";
import ActionTypes from "./types";

type Gender = "male" | "female";

interface IAction {
  payload: any;
  type: ActionTypes;
}

export interface IWorkspace {
  assistantName: string;
  gender: Gender;
  colorScheme: 1;
  workspaceId: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IStoreState {
  isAuthenticated: boolean;
  workspaces: [IWorkspace];
  user: IUser;
}

function isAuthenticated(initialState = false, actions: IAction) {
  const { payload, type } = actions;
  switch (type) {
    case ActionTypes.SET_AUTHENTICATION:
      return payload;
    default:
      return initialState;
  }
}

function workspaces(initialState = [] as any, actions: IAction) {
  const { payload, type } = actions;
  switch (type) {
    case ActionTypes.SET_WORKSPACES:
      return payload;
    default:
      return initialState;
  }
}

function user(initialState = {} as any, actions: IAction) {
  const { payload, type } = actions;
  switch (type) {
    case ActionTypes.SET_USER:
      return payload;
    default:
      return initialState;
  }
}

export default combineReducers<IStoreState>({
  isAuthenticated,
  workspaces,
  user,
});
