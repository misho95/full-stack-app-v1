import clsx from "clsx";
import { IconType } from "react-icons";
import { NavLinkProps } from "react-router-dom";
import { NavLink } from "react-router-dom";

interface ButtonProps extends NavLinkProps {
  navActive: string | null;
  title: string;
  Icon: IconType;
  IconActive: IconType;
  navigate: boolean;
}

const NavButton = ({
  title,
  navActive,
  Icon,
  IconActive,
  navigate,
  ...props
}: ButtonProps) => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!navigate) {
      event.preventDefault();
    }
    // If you have an onClick function in props, call it here
    if (props.onClick) {
      props.onClick(event);
    }
  };

  return (
    <NavLink
      replace
      end
      {...props}
      onClick={handleClick}
      className={clsx(
        "p-3 w-full flex gap-3 items-center hover:bg-slate200 group rounded-md",
        {
          "justify-center": navActive,
        }
      )}
    >
      {({ isActive }) =>
        navigate ? (
          navActive ? (
            isActive && !navActive ? (
              <CustomIcon Icon={IconActive} />
            ) : (
              <CustomIcon Icon={Icon} />
            )
          ) : (
            <>
              {isActive && !navActive ? (
                <CustomIcon Icon={IconActive} />
              ) : (
                <CustomIcon Icon={Icon} />
              )}
              <span
                className={clsx("capitalize", {
                  "font-bold": isActive,
                })}
              >
                {title}
              </span>
            </>
          )
        ) : navActive ? (
          title === navActive ? (
            <CustomIcon Icon={IconActive} />
          ) : (
            <CustomIcon Icon={Icon} />
          )
        ) : (
          <>
            {title === navActive ? (
              <CustomIcon Icon={IconActive} />
            ) : (
              <CustomIcon Icon={Icon} />
            )}
            <span
              className={clsx("capitalize", {
                "font-bold": isActive,
              })}
            >
              {title}
            </span>
          </>
        )
      }
    </NavLink>
  );
};

const CustomIcon = ({ Icon }: { Icon: IconType }) => {
  return <Icon className="size-[25px] group-hover:scale-110 duration-150 " />;
};

export default NavButton;
