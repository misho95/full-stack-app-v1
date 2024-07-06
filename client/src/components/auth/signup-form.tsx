import AuthInput from "./auth-input";
import FormContainer from "./form-container";
import { Link, useNavigate } from "react-router-dom";
import AuthSeparator from "./auth-separator";
import AuthButton from "./auth-button";
import { IoLogoFacebook } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AxiosInstance } from "../../utils/axios";

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    fullname: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const handleFormSubmit = async (data: {
    username: string;
    email: string;
    password: string;
    fullname: string;
  }) => {
    const { username, email, password, fullname } = data;

    AxiosInstance.post("/auth/signup", {
      username,
      email,
      password,
      fullname,
    })
      .then((res) => {
        if (res.data.status >= 400) {
          switch (res.data.message) {
            case "email and username both exist":
              setError("email", {
                type: "server",
                message: "Email already exists",
              });
              setError("username", {
                type: "server",
                message: "Username already exists",
              });
              break;
            case "email already exist":
              setError("email", {
                type: "server",
                message: "Email already exists",
              });
              break;
            case "username already exist":
              setError("username", {
                type: "server",
                message: "Username already exists",
              });
              break;
          }
        }

        if (res.data.status === 201 && res.data.message === "success") {
          navigate("/auth/signin");
        }
      })
      .catch(() => {});
  };

  return (
    <div className="flex flex-col gap-3 text-center">
      <FormContainer title>
        <h5 className="text-slate500 font-bold ">
          Sign up to see photos and videos from your friends.
        </h5>
        <AuthButton title={"Log in with Facebook"} Icon={IoLogoFacebook} />
        <AuthSeparator />
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-2 w-full p-3 text-xs text-slate600"
        >
          <AuthInput
            type="text"
            placeholder="Email"
            register={register}
            label="email"
            error={errors.email}
            required
            options={{}}
          />
          <AuthInput
            type="text"
            placeholder="Full Name"
            register={register}
            required
            label="fullname"
            error={errors.fullname}
          />
          <AuthInput
            type="text"
            placeholder="Username"
            register={register}
            required
            label="username"
            error={errors.username}
          />
          <AuthInput
            type="password"
            placeholder="Password"
            register={register}
            label="password"
            error={errors.password}
            required
          />
          <p>
            People who use our service may have uploaded your contact
            information to Social-Media-App.{" "}
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
