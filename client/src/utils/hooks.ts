import { useContext } from "react";
import { AuthProivder } from "../auth-provider";

export const useTokenSet = (token: string) => {
  const { setToken } = useContext(AuthProivder);
  setToken(token);
};
