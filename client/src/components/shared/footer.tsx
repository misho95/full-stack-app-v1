import { Link } from "react-router-dom";
import ThemeSwitch from "./theme-switch";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-3 justify-center items-center text-xs text-secondary">
      <nav className="flex gap-3 ">
        <Link to="/">Meta</Link>
        <Link to="/">About</Link>
        <Link to="/">Blog</Link>
        <Link to="/">Jobs</Link>
        <Link to="/">Help</Link>
        <Link to="/">API</Link>
        <Link to="/">Privacy</Link>
        <Link to="/">Terms</Link>
        <Link to="/">Locations</Link>
        <Link to="/">Instagram Lite</Link>
        <Link to="/">Threads</Link>
        <Link to="/">Contact Uploading & Non-Users</Link>
        <Link to="/">Meta Verified</Link>
      </nav>
      <div className="flex gap-3">
        <select>
          <option>English</option>
        </select>
        <p>© 2024 Instagram from Meta</p>
        <ThemeSwitch />
      </div>
    </footer>
  );
};

export default Footer;
