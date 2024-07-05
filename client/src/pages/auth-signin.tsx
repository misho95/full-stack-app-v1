import SignInForm from "../components/auth/signin-form";
import AuthContainer from "./auth-container";

const AuthSignInPage = () => {
  return (
    <AuthContainer>
      <div className="w-full h-full flex justify-center items-center gap-6">
        <img
          src="/girl.png"
          alt="phone"
          width={1280}
          height={1280}
          className="w-[400px] rounded-full hover:rotate-[360deg] duration-500"
        />

        <SignInForm />
      </div>
    </AuthContainer>
  );
};

export default AuthSignInPage;
