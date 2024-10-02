import { useContext } from 'react';
import callAPI from '../api/callAPI';
import { AuthContext } from '../AuthContext';

interface LoginRequest {
  email: string;
  password: string;
}

const useLogin = () => {
  const { setUser } = useContext(AuthContext);

  const login = async (request: LoginRequest) => {
    const userRes = await callAPI.post('/users/signin', request);
    setUser(userRes.data);
  };

  return { login };
};

export default useLogin;
