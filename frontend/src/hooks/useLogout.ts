import { useContext } from 'react';
import callAPI from '../api/callAPI';
import { AuthContext } from '../AuthContext';
import router from '../routes/router';

const useLogout = () => {
  const { setUser } = useContext(AuthContext);

  const logout = async () => {
    await callAPI.post('/users/signout');
    setUser(null);
    router.navigate('/login');
  };

  return logout;
};

export default useLogout;
