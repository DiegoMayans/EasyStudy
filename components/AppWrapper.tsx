import React from "react";
import { useDispatch } from "./GlobalStateProvider";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  const userJSON = localStorage.getItem("user");
  if (userJSON) {
    const user = JSON.parse(userJSON);
    dispatch(user);
  }

  return <div>{children}</div>;
};

export default AppWrapper;
