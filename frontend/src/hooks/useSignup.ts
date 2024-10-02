import { useContext } from "react";
import callAPI from "../api/callAPI";
import { AuthContext } from "../AuthContext";

interface SignupRequest {
  email: string;
  password: string;
  username?: string;
}

const useSignup = () => {
  const { setUser } = useContext(AuthContext);

  const signup = async (request: SignupRequest) => {
    const userRes = await callAPI.post("/users/register", request);
    setUser(userRes.data);
  };

  return { signup };
};

export default useSignup;
