import { useAuth } from "~authentication";
import { LoginPage } from "~components/login/LoginPage";
import React, { useEffect } from "react";

function LoginContainer() {
  const [error, setError] = React.useState("");
  const { login, isLoggedIn } = useAuth() as any;

  const handleSignInSubmit = async (request: {
    email: string;
    password: string;
  }) => {
    const { email, password } = request;
    try {
      await login(email, password);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = "/dashboard";
    }
  });

  return (
    <LoginPage
      error={error}
      onSignUpClick={() => {
        window.location.href = "/signup";
      }}
      onSignInSubmit={handleSignInSubmit}
    />
  );
}

export default LoginContainer;
