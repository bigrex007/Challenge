import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';

interface ResetPasswordProps {
  onSubmit: (credentials: { password: string; confirmPassword: string }) => Promise<void>;
  error?: string;
}

const ResetPasswordSubmit = ({ onSubmit, error }: ResetPasswordProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');

  const customStyles = {
    height: "90vh",
    maxWidth: {
      xs: "70%",
      md: "30%",
    },
    margin: "0 auto",
    justifyContent: "center",
  };

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setPasswordMatchError('Passwords do not match');
      return;
    }
    setPasswordMatchError('');
    onSubmit({ password, confirmPassword });
  };

  const isButtonDisabled = !password || !confirmPassword;

  return (
    <Stack spacing={3} sx={customStyles}>
      <h1>Reset your password</h1>
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!passwordMatchError || !!error}
        helperText={passwordMatchError || error}
      />
      <TextField
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!!passwordMatchError}
        helperText={passwordMatchError}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={isButtonDisabled}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default ResetPasswordSubmit;
