import { Link } from "react-router-dom";
import style from "./login-form.module.css";

const LoginForm = () => {
  return (
    <div className={style.container}>
      <form className={style.form}>
        <h1 className={style.title}>social-media</h1>
        <div className={style.inputHolder}>
          <input type="text" className={style.input} id="credential" required />
          <label htmlFor="credential" className={style.label}>
            Phone number, username, or email
          </label>
        </div>
        <div className={style.inputHolder}>
          <input
            type="password"
            className={style.input}
            id="password"
            required
          />
          <label htmlFor="password" className={style.label}>
            Password
          </label>
        </div>
        <button className={style.submitBtn}>Log in</button>
        <div className={style.line}>
          <span />
          <div>OR</div>
          <span />
        </div>
        <Link to="/" className={style.linkFb}>
          Login in with Facebook
        </Link>
        <Link to="/" className={style.linkFG}>
          Forgot password?
        </Link>
      </form>
      <div className={style.add}>
        Don't have an account? <Link to={"/"}>Sign up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
