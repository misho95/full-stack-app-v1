import { useState } from "react";
import AuthInput from "./auth-input";
import FormContainer from "./form-container";
import { Link } from "react-router-dom";

const SignInForm = () => {
  const [credentials, setCredentials] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <FormContainer title>
        <form className="flex flex-col gap-2 w-full p-3">
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
          <button className="bg-blue-500 text-white p-1 rounded-sm">
            Log in
          </button>
        </form>
        <div className="flex justify-center items-center w-full text-slate700 my-5 select-none">
          <div className="w-full h-[1px] bg-slate-400" />
          <div className="px-3">OR</div>
          <div className="w-full h-[1px] bg-slate-400" />
        </div>
        <button>Log in with Facebook</button>
        <Link to="/" className="text-xs">
          Forgot password?
        </Link>
      </FormContainer>
      <FormContainer>
        <p>
          Don't have an account? <Link to={"/"}>Sign up</Link>
        </p>
      </FormContainer>
    </div>
  );
};

export default SignInForm;
