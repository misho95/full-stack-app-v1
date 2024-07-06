import clsx from "clsx";
import { FieldError } from "react-hook-form";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string;
  label: string;
  register: any;
  required: boolean;
  error: FieldError | undefined;
};

const AuthInput = ({
  placeholder,
  label,
  register,
  required,
  error,
  ...props
}: InputProps) => {
  return (
    <div
      className={clsx(
        "w-full flex flex-col justify-center relative border-[1px]  bg-slate100 p-1 h-[40px] text-left",
        {
          "border-slate300": !error,
          "border-red-500": error,
        }
      )}
    >
      <label
        htmlFor={placeholder}
        className={clsx(
          "absolute duration-200 left-0 pl-2 w-full hover:cursor-text select-none",
          {
            "top-1/2 -translate-y-1/2 text-slate500": props.value === "",
            "top-[1px] text-xs text-slate400": props.value !== "",
          }
        )}
      >
        {placeholder}
      </label>
      <input
        id={placeholder}
        {...register(label, { required })}
        {...props}
        className={clsx(
          "bg-transparent focus:outline-none text-xs text-slate950 p-1",
          {
            "mt-[12px]": props.value !== "",
          }
        )}
      />
    </div>
  );
};

export default AuthInput;
