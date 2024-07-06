import clsx from "clsx";
import { FieldError, RegisterOptions } from "react-hook-form";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  register: any;
  required: boolean;
  error: FieldError | undefined;
  options?: RegisterOptions;
};

const AuthInput = ({
  label,
  register,
  required,
  error,
  options,
  ...props
}: InputProps) => {
  return (
    <>
      <div
        className={clsx(
          "w-full flex flex-col justify-center relative border-[1px]  bg-slate100 p-1 h-[40px] text-left",
          {
            "border-slate300": !error,
            "border-red-500": error,
          }
        )}
      >
        <input
          {...register(label, { required }, options)}
          {...props}
          className={
            "bg-transparent focus:outline-none text-xs text-slate950 p-1"
          }
        />
      </div>
      {error && (
        <div className="w-full text-xs text-red-500 text-left">
          {error.message}
        </div>
      )}
    </>
  );
};

export default AuthInput;
