import callAPI from '../api/callAPI';

interface ResetPasswordRequest {
  userId: string;
  resetToken: string;
  password: string;
}

interface RequestPasswordReset {
  email: string;
}

const useResetPassword = () => {
  const resetPassword = async ({ userId, resetToken, password }: ResetPasswordRequest) => {
    await callAPI.post('/users/reset-password', {
      userId,
      resetToken,
      password,
    });
  };

  const requestPassswordReset = async ({ email }: RequestPasswordReset) => {
    await callAPI.post('/users/reset-password', {
      email,
    });
  };

  return { resetPassword, requestPassswordReset };
};

export default useResetPassword;
