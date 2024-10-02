import { useParams, useNavigate } from 'react-router-dom';
import ResetPasswordSubmit from './ResetPasswordSubmit';
import { useNotification } from '../../NotificationContext';
import callAPI from '../../api/callAPI';

const ResetPasswordPage = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleSubmit = async ({ password }: { password: string }) => {
    try {
      await callAPI.patch('http://localhost:3000/users/update-password', {
        userId,
        token,
        password,
      });

      showNotification('Password reset successful!', 'success');
      navigate('/login');
    } catch (error) {
      showNotification('Error resetting password. Please try again.', 'error');
    }
  };

  return <ResetPasswordSubmit onSubmit={handleSubmit} error={''} />;
};

export default ResetPasswordPage;
