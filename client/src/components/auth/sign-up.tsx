import { useState } from "react";
import AuthInput from "./auth-input";
import FormContainer from "./form-container";
import { Link } from "react-router-dom";

const SignInUp = () => {
  const [credentials, setCredentials] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <FormContainer title>
        <h5>Sign up to see photos and videos from your friends.</h5>
        <button>Log in with Facebook</button>
        <div className="flex justify-center items-center w-full text-slate700 my-5 select-none">
          <div className="w-full h-[1px] bg-slate-400" />
          <div className="px-3">OR</div>
          <div className="w-full h-[1px] bg-slate-400" />
        </div>
        <form className="flex flex-col gap-2 w-full p-3">
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
            information to Instagram. <Link to={"/"}>Learn More</Link>
          </p>
          <p>
            By signing up, you agree to our Terms , Privacy Policy and Cookies
            Policy .
          </p>
          <button className="bg-blue-500 text-white p-1 rounded-sm">
            Sign up
          </button>
        </form>
      </FormContainer>
      <FormContainer>
        <p>
          Have an account? <Link to={"/auth/login"}>Log in</Link>
        </p>
      </FormContainer>
    </div>
  );
};

export default SignInUp;
