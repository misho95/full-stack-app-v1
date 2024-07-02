import { useState } from "react";
import AuthInput from "./auth-input";
import FormContainer from "./form-container";
import { Link } from "react-router-dom";
import AuthSeparator from "./auth-separator";
import AuthButton from "./auth-button";
import { IoLogoFacebook } from "react-icons/io";

const SignUpForm = () => {
  const [credentials, setCredentials] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-3 text-center">
      <FormContainer title>
        <h5 className="text-slate500 font-bold ">
          Sign up to see photos and videos from your friends.
        </h5>
        <AuthButton title={"Log in with Facebook"} Icon={IoLogoFacebook} />
        <AuthSeparator />
        <form className="flex flex-col gap-2 w-full p-3 text-xs text-slate600">
          <AuthInput
            type="text"
            placeholder="Email"
            value={credentials}
            onChange={(e) => setCredentials(e.target.value)}
          />
          <AuthInput
            type="text"
            placeholder="Full Name"
            value={credentials}
            onChange={(e) => setCredentials(e.target.value)}
          />
          <AuthInput
            type="text"
            placeholder="Username"
            value={credentials}
            onChange={(e) => setCredentials(e.target.value)}
          />
          <AuthInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>
            People who use our service may have uploaded your contact
            information to Instagram.{" "}
            <Link to={"/"} className="text-blue-500 font-semibold">
              Learn More
            </Link>
          </p>
          <p>
            By signing up, you agree to our Terms , Privacy Policy and Cookies
            Policy .
          </p>
          <AuthButton title={"Sign up"} />
        </form>
      </FormContainer>
      <FormContainer>
        <p>
          Have an account?{" "}
          <Link to={"/auth/signin"} className="text-blue-500 font-semibold">
            Log in
          </Link>
        </p>
      </FormContainer>
    </div>
  );
};

export default SignUpForm;
