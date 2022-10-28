import React, { useReducer } from "react";

import { IUserState } from "../types";

const userGlobalState: IUserState = {
  id: "",
  username: "",
  email: "",
  templates: [],
  token: "",
};
const globalStateContext = React.createContext(userGlobalState);
const dispatchStateContext = React.createContext<React.Dispatch<IUserState>>(() => {});

const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer((state: IUserState, newValue: IUserState) => {
    localStorage.setItem("user", JSON.stringify({ ...state, ...newValue }));
    return { ...state, ...newValue };
  }, userGlobalState);
  return (
    <globalStateContext.Provider value={state}>
      <dispatchStateContext.Provider value={dispatch}>{children}</dispatchStateContext.Provider>
    </globalStateContext.Provider>
  );
};

export default GlobalStateProvider;

export const useGlobalState: () => [IUserState, React.Dispatch<IUserState>] = () => [
  React.useContext(globalStateContext),
  React.useContext(dispatchStateContext),
];

export const useDispatch = () => React.useContext(dispatchStateContext);
