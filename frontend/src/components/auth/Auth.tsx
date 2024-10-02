import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

interface AuthProps {
  submitLabel: string;
  buttonLabel: string;
  onSubmit: (credentials: { email: string; password: string; username?: string }) => Promise<void>;
  children: React.ReactNode;
  error?: string;
}

const Auth = ({ submitLabel, buttonLabel, onSubmit, children, error }: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const changeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const authStyles = {
    height: "90vh",
    maxWidth: {
      xs: "70%",
      md: "30%",
    },
    margin: "0 auto",
    justifyContent: "center",
  };

  const handleSubmit = () => {
    if (submitLabel === "Signup" && password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }

    setPasswordMatchError("");

    if (submitLabel === "Create an Account") {
      onSubmit({ email, password, username });
    } else {
      onSubmit({ email, password });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  const isButtonDisabled = submitLabel === "Signup"
  ? !email || !password || !confirmPassword || !username
  : submitLabel === "Forgot your password?"  // Check if it's a password reset scenario
  ? !email // Only check if the email is provided
  : !email || !password;  

  return (
    <Stack spacing={3} sx={authStyles}>
      <h1>{submitLabel}</h1>

      {buttonLabel === "Submit" && (
        <TextField
          type="text"
          label="Username"
          value={username}
          onChange={changeUsername}
          onKeyDown={handleKeyDown}
          error={!!error}
          helperText={error}
        />
      )}

      <TextField
        type="email"
        label="Email"
        value={email}
        onChange={changeEmail}
        onKeyDown={handleKeyDown}
        error={!!error}
        helperText={error}
      />
      {buttonLabel !== "Send Email" && (
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={changePassword}
          onKeyDown={handleKeyDown}
          error={!!error || !!passwordMatchError}
          helperText={error || passwordMatchError}
        />
      )}

      {buttonLabel === "Submit" && (
        <TextField
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={changeConfirmPassword}
          onKeyDown={handleKeyDown}
          error={!!passwordMatchError}
          helperText={passwordMatchError}
        />
      )}

      <Button 
        variant="contained" 
        onClick={handleSubmit}
        disabled={isButtonDisabled}
      >
        {buttonLabel}
      </Button>
      {children}
    </Stack>
  );
};

export default Auth;
