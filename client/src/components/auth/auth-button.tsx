import { IconType } from "react-icons";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  Icon?: null | IconType;
};

const AuthButton = ({ Icon = null, title, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="w-full flex justify-center items-center gap-1 py-1 px-3 bg-blue-500 text-white rounded-sm text-base"
    >
      {Icon && <Icon className="size-5" />}
      {title}
    </button>
  );
};

export default AuthButton;
