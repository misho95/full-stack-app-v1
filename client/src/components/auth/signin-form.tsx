import { useContext, useState } from "react";
import AuthInput from "./auth-input";
import FormContainer from "./form-container";
import { Link, useNavigate } from "react-router-dom";
import AuthSeparator from "./auth-separator";
import AuthButton from "./auth-button";
import { IoLogoFacebook } from "react-icons/io";
import { AxiosInstance } from "../../utils/axios";
import { AuthProivder } from "../../app";

const SignInForm = () => {
  const [credentials, setCredentials] = useState("");
  const [password, setPassword] = useState("");

  const { setLoading } = useContext(AuthProivder);

  const navigate = useNavigate();

  const submitSigninForm = async (e: any) => {
    e.preventDefault();
    const res = await AxiosInstance.post(
      "http://localhost:8080/api/auth/signin",
      {
        username: "john",
        password: "changeme",
      }
    );

    const { access_token } = res.data;

    localStorage.setItem("_at", access_token);

    setLoading(true);
    navigate(0);
  };

  return (
    <div className="flex flex-col gap-3">
      <FormContainer title>
        <form
          onSubmit={submitSigninForm}
          className="flex flex-col gap-2 w-full p-3"
        >
          <AuthInput
            type="text"
            placeholder="Username or email"
            value={credentials}
            onChange={(e) => setCredentials(e.target.value)}
          />
          <AuthInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AuthButton title={"Log in"} />
        </form>
        <AuthSeparator />
        <AuthButton title={"Log in with Facebook"} Icon={IoLogoFacebook} />
        <Link to="/" className="text-xs">
          Forgot password?
        </Link>
      </FormContainer>
      <FormContainer>
        <p>
          Don't have an account?
          <Link to={"/auth/signup"} className="text-blue-500 font-semibold">
            Sign up
          </Link>
        </p>
      </FormContainer>
    </div>
  );
};

export default SignInForm;
