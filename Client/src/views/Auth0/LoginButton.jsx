import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import style from './LoginButton.module.css'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={style.login}>
    <button onClick={() => loginWithRedirect()} >
      Ingresa con{" "}
     { <img
        width="24"
        height="24"
        src="https://img.icons8.com/color/48/google-logo.png"
        alt="google-logo"
      />}
    </button>
    </div>
  );
};

export default LoginButton;
