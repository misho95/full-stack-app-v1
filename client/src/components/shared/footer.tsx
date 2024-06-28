import Link from "next/link";
import ThemeSwitch from "./theme-switch";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-3 justify-center items-center text-xs text-secondary">
      <nav className="flex gap-3 ">
        <Link href="/">Meta</Link>
        <Link href="/">About</Link>
        <Link href="/">Blog</Link>
        <Link href="/">Jobs</Link>
        <Link href="/">Help</Link>
        <Link href="/">API</Link>
        <Link href="/">Privacy</Link>
        <Link href="/">Terms</Link>
        <Link href="/">Locations</Link>
        <Link href="/">Instagram Lite</Link>
        <Link href="/">Threads</Link>
        <Link href="/">Contact Uploading & Non-Users</Link>
        <Link href="/">Meta Verified</Link>
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
