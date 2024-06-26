import styled from "styled-components";
import AnimatedPoster from "../components/login-page/animated-poster/animated-poster";
import LoginForm from "../components/login-page/login-form/login-form";
import LoginFooter from "../components/login-page/login-footer/login-footer";

const LoginPage = () => {
  return (
    <MainComponent>
      <MiddleComponent>
        <AnimatedPoster />
        <LoginForm />
      </MiddleComponent>
      <LoginFooter />
    </MainComponent>
  );
};

const MainComponent = styled.main`
  display: flex;
  justify-content: space-between;
  padding: 100px 10px 50px 10px;
  align-items: center;
  flex-direction: column;
  gap: 50px;
  min-width: 100vw;
  min-height: 100vh;
`;

const MiddleComponent = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
`;

export default LoginPage;
