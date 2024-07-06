import { useContext, useState } from "react";
import AuthInput from "./auth-input";
import FormContainer from "./form-container";
import { Link, useNavigate } from "react-router-dom";
import AuthSeparator from "./auth-separator";
import AuthButton from "./auth-button";
import { IoLogoFacebook } from "react-icons/io";
import { AxiosInstance } from "../../utils/axios";
import { AuthProivder } from "../../app";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    credentials: yup.string().required(),
    password: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { setLoading } = useContext(AuthProivder);

  const navigate = useNavigate();

  const [userError, setUserError] = useState<null | string>(null);

  const submitSigninForm = async (data: {
    credentials: string;
    password: string;
  }) => {
    await AxiosInstance.post("http://localhost:8080/api/auth/signin", {
      username: data.credentials,
      password: data.password,
    })
      .then((res) => {
        const { access_token } = res.data;
        localStorage.setItem("_at", access_token);

        setLoading(true);
        navigate(0);
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            setUserError("Wrong credentials");
            break;
          default:
            setUserError(null);
            break;
        }
      });
  };

  return (
    <div className="flex flex-col gap-3">
      <FormContainer title>
        <form
          onSubmit={handleSubmit(submitSigninForm)}
          className="flex flex-col gap-2 w-full p-3"
        >
          <AuthInput
            type="text"
            placeholder="Username or email"
            label="credentials"
            register={register}
            required
            error={errors.credentials}
          />
          <AuthInput
            type="password"
            placeholder="Password"
            label="password"
            register={register}
            required
            error={errors.password}
          />
          <AuthButton title={"Log in"} />
          {userError && (
            <div className="text-red-500 text-sm mt-5">{userError}</div>
          )}
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
