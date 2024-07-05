import SignUpForm from "../components/auth/signup-form";
import AuthContainer from "./auth-container";

const AuthSignUpPage = () => {
  return (
    <AuthContainer>
      <div className="flex justify-center items-center gap-5 ">
        <SignUpForm />
      </div>
    </AuthContainer>
  );
};

export default AuthSignUpPage;
