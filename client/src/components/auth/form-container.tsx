import { ReactNode } from "react";

const FormContainer = ({
  children,
  title = false,
}: {
  children: ReactNode;
  title?: boolean;
}) => {
  return (
    <div className="w-[350px] p-5 border-[1px] border-slate300">
      {title && (
        <h3 className="text-2xl font-bold uppercase mb-[20px] text-center mt-[20px]">
          Social-Media-App
        </h3>
      )}
      <div className="w-full flex flex-col gap-2 items-center">{children}</div>
    </div>
  );
};

export default FormContainer;
